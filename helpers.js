const axios = require('axios')

const getStrangerThingsData = async () => {
  const { data } = await axios.get(
    'http://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes'
  )
  return data
}

const getCommonlyUsedWords = episodes => {
  const cleanedString = episodes
    .map(({ summary }) => summary)
    .join(' ')
    .replace(/(<p>|<\/p>|\.|\,|\:|<b>|<\/b>|\;|")/gi, '')
  const words = cleanedString.split(' ').reduce((acc, word) => {
    const wordIndex = acc.findIndex(
      wordCount => wordCount.word.toLowerCase() === word.toLowerCase()
    )
    return ~wordIndex
      ? acc.map((wordCount, i) =>
          i === wordIndex
            ? {
                ...wordCount,
                count: wordCount.count + 1
              }
            : wordCount
        )
      : [
          ...acc,
          {
            word,
            count: 1
          }
        ]
  }, [])
  return words
    .sort((a, b) => b.count - a.count)
    .filter((_, i) => i < 5)
    .map(({ word, count }) => `${word} (${count})`)
    .join(', ')
}

const findFirstDustinSummary = episodes =>
  episodes.find(episode => episode.summary.toLowerCase().includes('dustin')).id

const getEpisodeAverage = episodes => {
  const totalEpisodeCount = episodes.length
  const numOfSeasons = [...new Set(episodes.map(({ season }) => season))].length
  return Math.floor((totalEpisodeCount / numOfSeasons) * 10) / 10
}

const getShortSummary = summary => {
  const summaryMinusHtml = summary.replace(/(<p>|<\/p>)/gi, '')
  const [beginning, _, second] = summaryMinusHtml.split(/\b\.( |$)/)
  return beginning === 'Dr' ? `${beginning}. ${second}.` : `${beginning}.`
}

const getTotalDurationInSeconds = episodes =>
  episodes.reduce((acc, { runtime }) => acc + runtime, 0) * 60

const getSequenceNumber = ({ season, number }) => `s${season}e${number}`

const getShortTitle = name => name.replace(/Chapter .*: /gi, '')

const getAirTimestampInEpoch = airstamp => new Date(airstamp).getTime() / 1000

const restructureEpisodes = episodes =>
  episodes.reduce(
    (acc, episode) => ({
      ...acc,
      [episode.id]: {
        sequenceNumber: getSequenceNumber(episode),
        shortTitle: getShortTitle(episode.name),
        airTimestamp: getAirTimestampInEpoch(episode.airstamp),
        shortSummary: getShortSummary(episode.summary)
      }
    }),
    {}
  )

const restructureShow = ({ id, _embedded: { episodes } }) => ({
  [id]: {
    totalDurationSec: getTotalDurationInSeconds(episodes),
    averageEpisodesPerSeason: getEpisodeAverage(episodes),
    episodes: restructureEpisodes(episodes)
  }
})

const runTheChallenge = async () => {
  const strangerThingsData = await getStrangerThingsData()
  console.log('==== Commonly Used Words ====')
  console.log(getCommonlyUsedWords(strangerThingsData._embedded.episodes))
  console.log('==== The First Dustin Episode ====')
  console.log(findFirstDustinSummary(strangerThingsData._embedded.episodes))
  console.log('==== Restructured Episode Object ====')
  console.log(JSON.stringify(restructureShow(strangerThingsData), {}, 2))
}

module.exports = {
  runTheChallenge,
  restructureShow,
  restructureEpisodes,
  getAirTimestampInEpoch,
  getShortTitle,
  getSequenceNumber,
  getTotalDurationInSeconds,
  getShortSummary,
  getCommonlyUsedWords,
  getStrangerThingsData,
  getEpisodeAverage,
  findFirstDustinSummary
}
