import { getCountryAndTokenNumber, getIsoCountryForCountryId, metadata } from './token';

// const ipfsArtCid = process.env.IPFS_ART_CID;

// if (!ipfsArtCid) {
//   throw new Error("You must define process.env.IPFS_ART_CID");
// }

export type Attribute = {
  trait_type:
    | 'Country'
    | 'Outline Iterations'
    | 'Theme'
    | 'Background'
    | 'Type'
    | 'Type Iterations';
  value: string | number;
  display_type?: 'date';
};

export type MetadataResponse = {
  description: string;
  external_url: string;
  animation_url: string;
  background_color: string;
  image: string;
  name: string;
  tags: string[];
  attributes: Attribute[];
};

export const contractMetadata = {
  name: 'Proof of Residency',
  description:
    'Proof of Residency is a Sybil-resistant Proof of Personhood protocol which issues non-transferable ERC-721 tokens based on physical mailing addresses.',
  image: 'https://proofofresidency.xyz/logo-dark.png',
  external_link: 'https://proofofresidency.xyz'
};

export const getMetadata = async (tokenId: string) => {
  const { countryId, tokenNumber } = getCountryAndTokenNumber(tokenId);

  const country = getIsoCountryForCountryId(countryId.toNumber());

  const meta = metadata(tokenId);

  const name = `${country?.country ?? 'Proof of Residency'}: #${tokenNumber}`;

  const attributes: Attribute[] = [
    {
      trait_type: 'Background',
      value: meta.colors.type
    },
    {
      trait_type: 'Theme',
      value: meta.colors.name
    },
    {
      trait_type: 'Type Iterations',
      value: meta.rhI
    },
    {
      trait_type: 'Outline Iterations',
      value: meta.sI
    }
  ];

  if (country?.country) {
    attributes.push({
      trait_type: 'Country',
      value: country.country
    });
  }

  const description = `Proof of Residency is a Sybil-resistant Proof of Personhood protocol which issues non-transferable ERC-721 tokens based on physical mailing addresses. ${
    country?.country
      ? `The generative art is inspired by the cartography of ${country.country}. `
      : ''
  }Every design is created from content stored immutably on the Ethereum blockchain. Designs are based on hydrography.`;

  const metadataOutput: MetadataResponse = {
    name: name,
    description: description,
    background_color: meta.colors.bgg.slice(1),
    external_url: `https://proofofresidency.xyz/token/${tokenId}`,
    image: `https://generator.proofofresidency.xyz/${tokenId}`, // `ipfs://${ipfsArtCid}/token/${tokenId}.png`,
    animation_url: `https://generator.proofofresidency.xyz/${tokenId}`, // `ipfs://${ipfsArtCid}/${tokenId}.html`,
    tags: ['proof-of-residency-protocol', 'proof-of-personhood', 'identity-protocol'],
    attributes: attributes
  };

  return metadataOutput;
};
