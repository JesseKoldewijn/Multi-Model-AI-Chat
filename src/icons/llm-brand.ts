import { stringCompare } from "~/lib/stringCompare";

import { Gemma, Google, Mistral, OpenAI } from "@lobehub/icons";

type SvgElemProps = {
  height: number | string;
  width: number | string;
} & React.HTMLAttributes<SVGSVGElement>;
type SvgIcon = React.ComponentType<SvgElemProps>;

export const llmBrandingIcons = {
  default: {
    default: OpenAI,
  },
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
    Object.keys(llmBrandingIcons).find((brandKey) =>
      stringCompare(brandKey, brand),
    );

  const modelFind =
    model &&
    Object.keys(
      llmBrandingIcons[brandFind as keyof typeof llmBrandingIcons] ??
        llmBrandingIcons.default,
    ).find((modelKey) => {
      const globalMatch = stringCompare(modelKey, model);
      const partialMatch = modelKey.includes(model) || model.includes(modelKey);

      return globalMatch || partialMatch;
    });

  const modelIcon =
    modelFind &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    (llmBrandingIcons[brandFind as keyof typeof llmBrandingIcons][
      modelFind as keyof (typeof llmBrandingIcons)[keyof typeof llmBrandingIcons]
    ] as unknown as SvgIcon | undefined);

  return {
    brand: brandFind,
    model: modelFind,
    icon: {
      model: modelIcon ?? undefined,
    },
  };
};
