import { type IconType } from "@lobehub/icons";
import { stringCompare } from "~/lib/stringCompare";

import { Gemma, Google, Mistral } from "@lobehub/icons";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

type SvgElemProps = {
  height: number | string;
  width: number | string;
} & React.HTMLAttributes<SVGSVGElement>;
type SvgIcon = React.ComponentType<SvgElemProps>;

export const llmBrandingIcons = {
  google: {
    gemma: Gemma,
    flan: Google,
  },
  Mistral: {
    Mixtral: Mistral,
  },
} as const;

export const findMostSimilarModel = (modelName: string) => {
  const [brand, model] = modelName.split("/");

  const brandFind =
    brand &&
    Object.keys(llmBrandingIcons).find((key) => stringCompare(key, brand));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const modelFind =
    brandFind &&
    model &&
    llmBrandingIcons[brandFind as keyof typeof llmBrandingIcons] &&
    Object.keys(
      llmBrandingIcons[brandFind as keyof typeof llmBrandingIcons],
    ).find((key) => stringCompare(key, model));

  return {
    brand: brandFind,
    model: modelFind,
    icon: {
      brand: llmBrandingIcons[
        brandFind as keyof typeof llmBrandingIcons
      ] as unknown as SvgIcon | undefined,
      model:
        modelFind &&
        ((
          llmBrandingIcons[brandFind as keyof typeof llmBrandingIcons] as {
            [key: string]: React.ComponentType<IconType>;
          }
        )[modelFind] as SvgIcon | undefined),
    },
  };
};
