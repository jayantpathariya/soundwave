export type Track = {
  id: string;
  title: string;
  artist: string;
  image: string;
  isPlaying?: boolean;
};

export const tracks: Track[] = [
  {
    id: "1",
    title: "Midnight Serenade",
    artist: "Luna Skye",
    image:
      "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
    isPlaying: false,
  },
  {
    id: "2",
    title: "Neon Dreams",
    artist: "The Synth Collective",
    image:
      "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
    isPlaying: true,
  },
  {
    id: "3",
    title: "Echoes of Yesterday",
    artist: "Vintage Vibes",
    image:
      "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
    isPlaying: false,
  },
  {
    id: "4",
    title: "Urban Jungle",
    artist: "Metro Beats",
    image:
      "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
    isPlaying: false,
  },
  // {
  //   id: "5",
  //   title: "Stellar Voyage",
  //   artist: "Cosmic Soundwaves",
  //   image:
  //     "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
  //   isPlaying: false,
  // },
  // {
  //   id: "6",
  //   title: "Acoustic Sunrise",
  //   artist: "Mellow Meadows",
  //   image:
  //     "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
  //   isPlaying: false,
  // },
  // {
  //   id: "7",
  //   title: "Electric Pulse",
  //   artist: "Volt & The Amplifiers",
  //   image:
  //     "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
  //   isPlaying: false,
  // },
  // {
  //   id: "8",
  //   title: "Rainy Day Jazz",
  //   artist: "The Blue Note Quartet",
  //   image:
  //     "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
  //   isPlaying: false,
  // },
  // {
  //   id: "9",
  //   title: "Sunset Boulevard",
  //   artist: "California Dreamers",
  //   image:
  //     "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
  //   isPlaying: false,
  // },
  // {
  //   id: "10",
  //   title: "Quantum Harmonies",
  //   artist: "The Physics Phunk Band",
  //   image:
  //     "https://hellogiggles.com/wp-content/uploads/sites/7/2016/07/22/wildewoman.jpg",
  //   isPlaying: false,
  // },
];
