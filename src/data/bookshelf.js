/**
 * @type {Record.<string, Array.<{id?: string, title: string, author?: string, description?: string, url: string, img?: string}>>}
 */
const books = {
  "Currently reading": [
    {
      id: "47fde12d-ff91-4a2e-8fb4-d81a5e5eb9d9",
      title: "The Innovation Stack",
      author: "Jim McKelvey",
      url: "https://www.amazon.in/dp/B07SZQN3P6",
    },
  ],
  "To read": [
    {
      id: "19c845be-6f00-4c29-ab8b-1be0a1a9edd0",
      title: "Creative Selection",
      author: "Ken Kocienda",
      url: "https://www.amazon.in/dp/1529004713",
    },
    {
      id: "01b06d50-e085-47b2-b9c8-7ff62bc67113",
      title: "The Checklist Manifesto",
      author: "Atul Gawande",
      url: "https://www.amazon.in/dp/0143423223",
    },
    {
      id: "d5a04fea-79d2-4f73-bdab-667794c2509a",
      title: "The Hard Thing About Hard Things",
      author: "Ben Horowitz",
      url: "https://www.amazon.in/dp/0062273205",
    },
    {
      id: "c111960a-870d-4e30-ab9c-a14a5d56387c",
      title: "Metaskills",
      author: "Marty Neumeier",
      url: "https://www.amazon.in/dp/0321898672",
    },
    {
      id: "f258d06a-c2a3-4ad7-98c0-8848d2cfa059",
      title: "On Tyranny",
      author: "Timothy Snyder",
      url: "https://www.amazon.in/dp/1847924883",
    },
    {
      id: "81c3daba-378f-47d3-b7ce-617ab84cf54a",
      title: "No Rules Rules",
      author: "Erin Meyer",
      url: "https://www.amazon.in/dp/075355366X",
    },
    // { title: "", author: "", link: "" },
  ],
  Read: [
    {
      id: "119ab02f-22ac-4c80-97dc-bc6a6d19adc9",
      title: "The Last Lecture",
      author: "Randy Pausch, Jeffrey Zaslow",
      url: "https://www.amazon.in/dp/0340977736",
    },
    {
      id: "297a6487-496e-4642-af96-0fda47312838",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      url: "https://www.amazon.in/dp/0099590085",
    },
    {
      id: "4857e017-ea53-4b1a-8d3d-8c18b6111b16",
      title: "Hooked",
      author: "Nir Eyal",
      url: "https://www.amazon.in/dp/0241184835",
    },
  ],
};

module.exports.books = books;
