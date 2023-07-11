import axios from "axios";
async function handleTwitterDownload(url) {
  let tweet_id = url.match("[0-9]{10,20}");
  return await fetch(
    `https://api.animemoe.us/twitter-video-downloader/v2/?id=${tweet_id}`
  ).then((res) => res.json());
}

async function handleFacebookDownload(url) {
  try {
    let data = await axios.get(
      `https://beautiful-gumption-a90fa5.netlify.app/.netlify/functions/api/facebook?url=${url}`
    );

    const thumbnail = data.data.data[0].thumbnail ?? "";
    data = data.data.data
      .filter((item) => item.url.includes("http"))
      .map((item) => ({
        size: item.resolution,
        url: item.url,
      }));
    return {
      success: "true",
      message: "",
      data: {
        videos: data,
        name: "",
        username: "",
        status_type: "video",
        thumbnail,
      },
    };
  } catch (e) {
    return {
      message: "Error Fetching Data",
    };
  }
}
async function handleInstagramDownload(url) {
  try {
    let data = await axios.get(
      `https://beautiful-gumption-a90fa5.netlify.app/.netlify/functions/api/instagram?url=${url}`
    );
    const thumbnail = data.data.data[0].thumbnail ?? "";
    data = data.data.data
      .filter(
        (item) =>
          !item.url.includes("jpg") &&
          !item.url.includes("jpeg") &&
          !item.url.includes("png")
      )
      .map((item) => ({
        size: "Download",
        url: item.url,
      }));
    return {
      success: "true",
      message: "",
      data: {
        videos: data,
        name: "",
        username: "",
        status_type: "video",
        thumbnail,
      },
    };
  } catch (e) {
    return {
      message: "Error Fetching Data",
    };
  }
}

async function handlePinterestDownload(url) {
  try {
    let data = await axios
      .get(
        `https://beautiful-gumption-a90fa5.netlify.app/.netlify/functions/api/pinterest?url=${url}`
      )
      .then((res) => res.data);
    return {
      success: "true",
      message: "",
      data: {
        videos: [
          {
            size: "Download",
            url: data.uri,
          },
        ],
        name: data.title,
        username: data.user.name,
        status_type: "video",
        thumbnail: data.user.imageURL ?? "",
      },
    };
  } catch (e) {
    return { message: e?.data?.message || "Error Fetching Data" };
  }
}
const providerFunctions = {
  Twitter: handleTwitterDownload,
  Facebook: handleFacebookDownload,
  Instagram: handleInstagramDownload,
  Pinterest: handlePinterestDownload,
};

export default providerFunctions;
