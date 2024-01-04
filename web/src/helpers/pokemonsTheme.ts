export interface ThemeType {
  Pokemons: {
    [key: string]: {
      Icon: string,
      bg?: string,
      text?: string,
    }
  }
}

export const Theme: ThemeType = {
  Pokemons: {
    'all': {
      Icon: '/icon-all.svg',
    },
    normal: {
      Icon: '/normalIcon.svg',
      bg: "#E8E8E8",
      text: "#909090"
    },
    fire: {
      Icon: '/fireIcon.svg',
      bg: "#FFEBCA",
      text: "#E96303"
    },
    water: {
      Icon: '/waterIcon.svg',
      bg: "#DFECF5",
      text: "#4F77BE"
    },
    grass: {
      Icon: '/grassIcon.svg',
      bg: "#D6EBDC",
          text: "#73B861"
    },
    flying: {
      Icon: '/flyingIcon.svg',
      bg: "#ECF0F9",
      text: "#758CBD",
    },
    fighting: {
      Icon: '/fightingIcon.svg',
      bg: '#F3DBDF',
      text: '#C44D61',
    }, 
    poison: {
      Icon: '/poisonIcon.svg',
      bg: '#EEE1F4',
      text: '#AC6ACA',
    },
    electric: {
      Icon: '/electricIcon.svg',
      bg: '#F5F2DF',
      text: '#D4BC34',
    },
    ground: {
      Icon: '/groundIcon.svg',
      bg: '#F5E4DB',
  text: '#CE8056',
    },
    psychic: {
      Icon: '/psychicIcon.svg',
      bg: '#FBE8E7',
      text: '#EB8B85',
    },
    rock: {
      Icon: '/rockIcon.svg',
      bg: '#E7F5F2',
      text: '#84BEB3',
    },
    ice: {
      Icon: '/iceIcon.svg',
      bg: '#E5F3F0',
      text: '#71BAAC',
    },
    bug: {
      Icon: '/bugIcon.svg',
      bg: '#E6ECD7',
      text: '#9BBA48',
    },
    dragon: {
      Icon: '/dragonIcon.svg',
      bg: '#DAE1EB',
      text: '#2C6AC1',
    },
    ghost: {
      Icon: '/ghostIcon.svg',
      bg: '#DFE2F1',
      text: '#616EB7',
    },
    dark: {
      Icon: '/darkIcon.svg',
      bg: '#D8D8D9',
      text: '#595761',
    },
    steel: {
      Icon: '/steelIcon.svg',
      bg: '#DFE2F1',
      text: '#6594A1',
    },
    fairy: {
      Icon: '/fairyIcon.svg',
      bg: '#F8E8F8',
      text: '#E296E1',
    },
  }
}