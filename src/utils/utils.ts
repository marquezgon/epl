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
  brazil: {
    flag: '\ud83c\udde7\ud83c\uddf7',
    text: 'Brasil'
  },
  england: {
    flag: '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f',
    text: 'Inglaterra'
  },
  germany: {
    flag: '\ud83c\udde9\ud83c\uddea',
    text: 'Alemania'
  },
  netherlands: {
    flag: '\ud83c\uddf3\ud83c\uddf1',
    text: 'Holanda'
  },
  portugal: {
    flag: '\ud83c\uddf5\ud83c\uddf9',
    text: 'Portugal'
  },
  spain: {
    flag: '\ud83c\uddea\ud83c\uddf8',
    text: 'España'
  },
  switzerland: {
    flag: '\ud83c\udde8\ud83c\udded',
    text: 'Suiza'
  },
  ukraine: {
    flag: '\ud83c\uddfa\ud83c\udde6',
    text: 'Ucrania'
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
            console.log(incoming);
            return incoming;
          },
        }
      }
    }
  }
});
