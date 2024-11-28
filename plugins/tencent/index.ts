import axios from "axios";

module.exports = {
  platform: "Tencent",
  author: "@咔咔龙@zhongerxll@kakadragonn",
  version: "0.0.1",
  srcUrl: "https://raw.githubusercontent.com/zhongerxll/MusicFreePlugins/refs/heads/master/dist/tencent/index.js",
  cacheControl: "no-cache",
  supportedSearchType: ["music", "album", "lyric"],

  async search(query, page, type) {
    if (type === "music") {
      let response = (
        await axios.get("https://music-api.gdstudio.xyz/api.php", {
          params: {
            types: "search",
            source: "tencent",
            name: query,
            pages: page
          }
        })
      ).data
      if (response.length) {
        response = response.map(item => ({
          ...item,
          title: item.name,
          artist: item.artist.join(',')
        }));
        return {
          isEnd: false,
          data: response
        }
      } else {
        return {
          data: []
        }
      }
    }
  },

  async getMediaSource(musicItem, quality) {
    const qualityLevels = {
      low: "128",
      standard: "192",
      high: "320",
      super: "740"
    };
    const url = (
      await axios.get("https://music-api.gdstudio.xyz/api.php", {
        params: {
          types: "url",
          source: "tencent",
          id: musicItem.id,
          br: qualityLevels[quality]
        }
      })
    ).data.url
    return {
      url: url
    }
  },

  async getMusicInfo(musicItem) {
    const artwork = (
      await axios.get("https://music-api.gdstudio.xyz/api.php", {
        params: {
          types: "pic",
          source: "tencent",
          id: musicItem.pic_id,
          size: "500"
        }
      })
    ).data.url
    return {
      artwork: artwork,
    };
  },

  async getLyric(musicItem) {
    const lrc = (
      await axios.get("https://music-api.gdstudio.xyz/api.php", {
        params: {
          types: "lyric",
          source: "tencent",
          id: musicItem.lyric_id,
        }
      })
    ).data.lyric
    return {
      rawLrc: lrc
    };
  },

};