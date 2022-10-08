import { InMemoryCache } from '@apollo/client';

export const logoPath = 'https://epremierleague-team-owner-images.s3.amazonaws.com/uploads/';

interface Country {
  england: keyof string;
}

interface CountryInfo {
  flag: string,
  text: string,
}

export const countryList = {
  algeria: {
    flag: '\ud83c\udde9\ud83c\uddff',
    text: 'Argelia'
  },
  argentina: {
    flag: '\ud83c\udde6\ud83c\uddf7',
    text: 'Argentina'
  },
  australia: {
    flag: '\ud83c\udde6\ud83c\uddfa',
    text: 'Australia'
  },
  belgium: {
    flag: '\ud83c\udde7\ud83c\uddea',
    text: 'Bélgica'
  },
  brazil: {
    flag: '\ud83c\udde7\ud83c\uddf7',
    text: 'Brasil'
  },
  cameroon: {
    flag: '\ud83c\udde8\ud83c\uddf2',
    text: 'Camerún'
  },
  canada: {
    flag: '\ud83c\udde8\ud83c\udde6',
    text: 'Canadá'
  },
  'china pr': {
    flag: '\ud83c\udde8\ud83c\uddf3',
    text: 'China'
  },
  colombia: {
    flag: '\ud83c\udde8\ud83c\uddf4',
    text: 'Colombia'
  },
  'costa rica': {
    flag: '\ud83c\udde8\ud83c\uddf7',
    text: 'Costa Rica'
  },
  croatia: {
    flag: '\ud83c\udded\ud83c\uddf7',
    text: 'Croacia'
  },
  'czech republic': {
    flag: '\ud83c\udde8\ud83c\uddff',
    text: 'Républica Checa'
  },
  egypt: {
    flag: '\ud83c\uddea\ud83c\uddec',
    text: 'Egipto'
  },
  england: {
    flag: '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f',
    text: 'Inglaterra'
  },
  france: {
    flag: '\ud83c\uddeb\ud83c\uddf7',
    text: 'Francia'
  },
  gabon: {
    flag: '\ud83c\uddec\ud83c\udde6',
    text: 'Gabón'
  },
  germany: {
    flag: '\ud83c\udde9\ud83c\uddea',
    text: 'Alemania'
  },
  ghana: {
    flag: '\ud83c\uddec\ud83c\udded',
    text: 'Ghana'
  },
  'republic of ireland': {
    flag: '\ud83c\uddee\ud83c\uddea',
    text: 'Irlanda'
  },
  israel: {
    flag: '\ud83c\uddee\ud83c\uddf1',
    text: 'Israel'
  },
  italy: {
    flag: '\ud83c\uddee\ud83c\uddf9',
    text: 'Italia'
  },
  japan: {
    flag: '\ud83c\uddef\ud83c\uddf5',
    text: 'Japón'
  },
  mali: {
    flag: '\ud83c\uddf2\ud83c\uddf1',
    text: 'Malí'
  },
  mexico: {
    flag: '	\ud83c\uddf2\ud83c\uddfd',
    text: 'México'
  },
  montenegro: {
    flag: '\ud83c\uddf2\ud83c\uddea',
    text: 'Montenegro'
  },
  morocco: {
    flag: '\ud83c\uddf2\ud83c\udde6',
    text: 'Marruecos'
  },
  netherlands: {
    flag: '\ud83c\uddf3\ud83c\uddf1',
    text: 'Holanda'
  },
  nigeria: {
    flag: '\ud83c\uddf3\ud83c\uddec',
    text: 'Nigeria'
  },
  norway: {
    flag: '\ud83c\uddf3\ud83c\uddf4',
    text: 'Noruega'
  },
  paraguay: {
    flag: '\ud83c\uddf5\ud83c\uddfe',
    text: 'Paraguay'
  },
  peru: {
    flag: '\ud83c\uddf5\ud83c\uddea',
    text: 'Perú'
  },
  poland: {
    flag: '\ud83c\uddf5\ud83c\uddf1',
    text: 'Polonia'
  },
  portugal: {
    flag: '\ud83c\uddf5\ud83c\uddf9',
    text: 'Portugal'
  },
  romania: {
    flag: '\ud83c\uddf7\ud83c\uddf4',
    text: 'Rumania'
  },
  scotland: {
    flag: '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f',
    text: 'Escocia',
  },
  senegal: {
    flag: '\ud83c\uddf8\ud83c\uddf3',
    text: 'Senegal'
  },
  serbia: {
    flag: '\ud83c\uddf7\ud83c\uddf8',
    text: 'Serbia'
  },
  spain: {
    flag: '\ud83c\uddea\ud83c\uddf8',
    text: 'España'
  },
  'south africa': {
    flag: '\ud83c\uddff\ud83c\udde6',
    text: 'Sudáfrica'
  },
  sweden: {
    flag: '\ud83c\uddf8\ud83c\uddea',
    text: 'Sweden'
  },
  switzerland: {
    flag: '\ud83c\udde8\ud83c\udded',
    text: 'Suiza'
  },
  ukraine: {
    flag: '\ud83c\uddfa\ud83c\udde6',
    text: 'Ucrania'
  },
  'united states': {
    flag: '\ud83c\uddfa\ud83c\uddf8',
    text: 'Estados Unidos'
  },
  uruguay: {
    flag: '\ud83c\uddfa\ud83c\uddfe',
    text: 'Uruguay'
  },
  wales: {
    flag: '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f',
    text: 'Gales'
  }
};

export const getFlag = (country: string | undefined | null) : CountryInfo | null => {
  if (country && countryList[country as keyof Country]) {
    const flag = countryList[country as keyof Country];
    return flag;
  }

  return null;
}

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        listPlayers: {
          keyArgs: false,
          merge(existing = {}, incoming) {
            if (typeof existing.nextToken === 'undefined') {
              return {
                ...existing,
                ...incoming
              };
            }

            return incoming;
          },
        }
      }
    }
  }
});

export function capitalizeFirstLetter(word: string) {
  const arr = word.split(' ');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(' ');
}
