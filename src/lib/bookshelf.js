require("isomorphic-fetch");

module.exports.getBooks = async () => {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/table/cee24ed079424c76a59cf386b9e9d78d",
    {
      method: "get",
    }
  ).then((res) => res.json());
  return data.reduce((acc, cur) => {
    const { status, ...metadata } = cur;
    acc[status] = [
      ...(Array.isArray(acc[status]) ? acc[status] : []),
      metadata,
    ];
    return acc;
  }, {});
};
