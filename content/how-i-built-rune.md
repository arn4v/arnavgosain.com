---
title: "How I Built Rune"
publishedOn: "2022-05-29"
---

- [Introduction](#introduction)
- [Problems with existing solutions](#problems-with-existing-solutions)
  - [1. Consumption in a silo](#1-consumption-in-a-silo)
  - [2. Platform Restricted](#2-platform-restricted)
- [Deciding The User Experience](#deciding-the-user-experience)
- [Choosing The Tech Stack](#choosing-the-tech-stack)
  - [Remix.run](#remixrun)
  - [TailwindCSS](#tailwindcss)
  - [Prisma](#prisma)
  - [SQLite](#sqlite)
  - [Litestream](#litestream)
  - [Postmark](#postmark)
- [Processing Inbound Emails](#processing-inbound-emails)
- [Choosing The Color Pallette](#choosing-the-color-pallette)
- [Rendering Newsletter Content](#rendering-newsletter-content)
- [Highlighting Newsletter Content](#highlighting-newsletter-content)
- [Deployment](#deployment)
- [Footnotes](#footnotes)

---

## Introduction

I love reading newsletters. They are an essential part of my day-to-day and help me stay informed about the ongoings of the world.

From where I stand, Substack marked the second coming of newsletters. What WordPress did for blogs, Substack did for newsletters. Great content, great deliver medium, what's not to love? That's what I thought too, until I started spending a significant chunk of time reading them – which made me realize how awful general purpose email clients are for reading long-form content.

Over time, many people have tried to solve this problem with apps of their own. But none of them really solved the problem for me due to one of these two issues:

## Problems with existing solutions

### 1. Consumption in a silo

Like any piece of content, I want to be able relate what I'm consuming to what I've consumed before. I want to be able to highlight, and sync those highlights to apps like Notion, or Roam, or RemNote, or Readwise. Something that allows me to review my takeaways from time to time.

### 2. Platform Restricted

Matter[^1] is a fantastic app that solves this problem remarkably well, but it's only available on iOS. Not even the web, only iOS. Another one is Slick Inbox[^2] And I get why that is, they want to deliver a good experience to a select number of people on a limited budget – but that doesn't cut it for my needs.

---

This is why I built [Rune](https://runereader.co)[^3] – a dedicated space for newsletter reading that allows you to highlight & sync your highlights to select apps.

In this article, I'll walk you through the how Rune works under the hood.

## Deciding The User Experience

Since I didn't want to spend a ton of time building the app, the UX had to be no frills. No magic link, no auto-syncing via OAuth – it had to be barebones.

Since Rune is a niche product, the base assumptions are that users would want to do one or both of the following:

- a) Most users will want to somehow forward newsletters from their email which is already subscribed to said newsletters
- b) Be able to subscribe to new newsletters with a email addressed managed by Rune

For a), the user experience would be:

1. Each user would sign up with a unique username, which would be used to create a inbound-only email address `username@inbox.runereader.co`
2. They can set up a filter in Gmail/email provider of their choice, and setup autoforwarding of all of their newsletters to this email Rune provides them with

For b), since we're already providing a unique email to each user, this is automatically solved. They can use the same email to subscribe to newsletters.

## Choosing The Tech Stack

Following is the tech stack I used:

### Remix.run

I've been a long time fan of Next.js, and have used it for most of of my previous projects[^4], but I wanted to experiment with something different for this project that still uses React – so I want with Remix.

Remix was a fantastic choice because it allows me to rapidly interate without having to worry about setting up

### TailwindCSS

Most people, when they see Tailwind, get stuck on "eww those long classes look awful, I can write vanilla CSS faster than this". Which is fine – to each their own but they somehow seem the main advantage of using Tailwind: the design system.

It makes for a delightful experience when building side projects because I don't have to worry about which colors to use, or which border radiuses or box shadows to use.

### Prisma

I didn't particularly like to mess with raw SQL, and I've used Prisma quite extensively and absolutely love the API. Simply put, it's the best ORM I've used.

### SQLite

I've experimented with databases in the past, but that was mostly because I wanted to learn more about the nuances of different databases. For Markbox, I used MySQL hosted on Railway.

For Rune, however, I didn't want the overhead of a hosted database, so I used SQLite.

### Litestream

There's just one caveat with SQLite, it's an on-disk database and since I'm using Railway to host Rune via Docker – if we don't backup the database somehow, the data will be lost when a new change is deployed which creates a totally new container.

To solve this dilemma, I used Litestream. Litestream is a CLI tool that, to simplify things, "hooks" into your database's operations and backs changes to S3 as they are made to the database.

So when a new deployment is made live, it's as easy as pulling the latest backup from S3 and using Litestream[^5] to start the backup process again.

### Postmark

Rune uses Postmark to process inbound emails, more on this in the [next section](#processing-inbound-emails).

## Processing Inbound Emails

Rune is a newsletter reader. So naturally, it needs to be able to receive and show inbound emails. There are quite a few options to achieve this. Sendgrid and Mailgun seem to be the top two.

So naturally, I tried Sendgrid – but they wanted me to talk to their customer support to unblock/verify my account and so I dropped it and went with Postmark because it was the fastest to verify my account for production usage.

The inbound stream in Postmark is set to hit Rune's inbound webhook. Postmark sends emails from a set list of IPs, which is what Rune validates the POST request against and rejects it if it is not from a valid Postmark IP.

Since Postmark's JSON payload already parses the raw email and provides you with the HTML, all you have to do is sanitize the HTML.

## Choosing The Color Pallette

Since I'm using [Tailwind](#tailwindcss) for this project, the only thing I really needed to worry about to choose the color scheme. I'd come across Happy Hues[^6] a couple days prior, a collection of color pallettes with a simple website to preview them.

## Rendering Newsletter Content

Email HTML is particularly tricky to deal with. Email providers put received emails through all sorts of pre-processors to make it play well with the styles of the email client. I didn't want to deal with changing the HTML markup to make it render properly and at the same time, I wanted the email HTML to be sandboxed.To solve both of these problems, Rune renders email HTML within IFrame.

There are a couple of ways you can render static HTML within an IFrame:
**1. You can convert the HTML to a data string & pass it to the src prop**

```jsx
export function ContentFrame({ content }) {
  const dataString = `data:text/html,${encodeURI(content)}`;

  return <iframe src={dataString} />;
}
```

**2. Pass in HTML in srcdoc**

```jsx
export function IssuePage() {
  const { issueId, newsletterId } = useParams();
  const { content } = useLoaderData();
  return <iframe srcdoc={content} />;
}
```

**3. Pass in URL of the page**

```jsx
export default function IssuePage() {
  const { issueId, newsletterId } = useParams();

  return (
    <iframe src={`/newsletters/${newsletterId}/issue/${issueId}/content`} />
  );
}
```

I went with Option 3 and set up a Remix Resource Route (fancier term for "REST endpoint"), that returns the HTML for that issue

## Highlighting Newsletter Content

One of the USPs of Rune is the ability to highlight content. Since the theme of this entire project was to be as scrappy as possible, I decided to use an `web-highlighter` library for highlighting content. To make the highlighter work within the IFrame, I would need to, for the lack of a better word, "inject" a JS script that uses this library to:

1. Highlight the content
2. Communicate with the parent window to save persist these highlights in the database

For this, I created a standalone TypeScript "script" that gets compiled via esbuild and saved to the `/public` folder. Then, in the _onload_ event listener on the IFrame, a script tag is created with the url of the highlighter script and inserted within the IFrame's <head>. From then on, the `web-highlighter` library does all the heavy lifting. `web-highlighter` dispatches events when a highlighter is created or deleted, on either event a message is posted to the parent window.

From the IFrame:

```js
highlighter.on("CREATE", ({ sources }) => {
  window.parent.postMessage(
    JSON.stringify({
      action: "save_highlights",
      sources,
    })
  );
});
```

In the parent window:

```jsx
export default function IssuePage() {
  const { issueId, newsletterId } = useParams();
  const iframeRef = React.useRef(null);
  const { highlights } = useLoaderData();
  const fetcher = useFetcher();

  React.useEffect(() => {
    const handleEvent = (e: MessageEvent) => {
      if (e.source === iframeRef.current?.contentWindow) {
        const { data, action } = JSON.parse(e.data);
        const formData = new FormData();
        formData.set("action", action);
        formData.set("data", JSON.stringify(data));
        fetcher.submit(formData, {
          method: "put",
        });
      }
    };

    window.addEventListener("message", handleEvent);

    return () => window.removeEventListener("message", handleEvent);
  }, [fetcher]);

  return (
    <iframe src={`/newsletters/${newsletterId}/issue/${issueId}/content`} />
  );
}
```

## Deployment

I finished building the MVP in < 4 days thanks to Remix, and since I was using Remix's indie stack which comes with configuration for Fly.io, I decided to give Fly.io a go.

As I was trying out Fly, it looked a little too sophisticated/complex for my simple project. Thus I decided to go with [Railway](https://railway.app), which I already [Markbox](https://markbox.in).

  
## How It Looks
  
![runereader co_newsletters_cl3puql8300317imc66t4lfc6_issue_cl3puql9800357imciixqcizh(Macbook Pro Screenshot)](https://user-images.githubusercontent.com/12715704/170896848-dfa6ad50-b5c4-4af9-8c2d-d51f4dee4ddc.png)


---

## Footnotes

[^1]: https://hq.getmatter.com/
[^2]: https://slickinbox.com/
[^3]: https://runereader.co
[^4]: https://arnavgosain.com/projects
[^5]: https://litestream.io/
[^6]: https://www.happyhues.co/