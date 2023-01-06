import produce from "immer";
import * as Mustache from "mustache";
import create from "zustand";
import {
  ArticleInput,
  BlogSectionInput,
  BlogTypeFragment,
  FieldType,
  TemplateTypeFragment,
  ValueInput,
} from "../../graphql/gql";
import { Setter } from "../../utils/types/types";

type Store = {
  init: (origin?: BlogTypeFragment) => void;
  sections: BlogSectionStore[];
  title: string;
  url: string;
  template?: TemplateTypeFragment;
  render: () => string;
};

type BlogSectionStore = Omit<BlogSectionInput, "articles"> & {
  setUse: Setter<boolean>;
  setTitle: Setter<string>;
  articles: ArticleStore[];
};

export type ArticleStore = Omit<ArticleInput, "contents"> & {
  contents: BlogArticleContentStore[];
};

type BlogArticleContentStore = ValueInput & {
  setValue: Setter<string>;
  field: () => FieldDefStore;
};

type FieldDefStore = {
  id: string;
  order?: number;
  label?: string;
  type?: FieldType;
  location?: string;
  setLabel?: Setter<string>;
};

export type BlogStore = Store;

export const useBlogStore = create<Store>((set, get) => ({
  sections: [],
  title: "",
  url: "",
  init: (origin) =>
    origin &&
    set({
      template: origin.template,
      title: origin.title,
      url: origin.url,
      sections: origin.sections.map((s, i) => ({
        articles: s.articles.map((a, j) => ({
          ...a,
          contents: a.contents.map((c, k) => ({
            ...c,
            setValue: (value: string) =>
              set(
                produce<Store>((state) => {
                  state.sections[i].articles[j].contents[k].value = value;
                })
              ),
            field: (): FieldDefStore => {
              const def = get().sections[i].fieldDefs.find(
                (f) => f.id === c.fieldId
              );
              if (!def) {
                return {
                  id: c.fieldId,
                };
              }

              return {
                id: c.fieldId,
                label: def.label,
                location: def.location,
                order: def.order,
                type: def.type,
                setLabel: (value: string) =>
                  set(
                    produce<Store>((state) => {
                      const found = state.sections[i].fieldDefs.find(
                        (f) => f.id === c.fieldId
                      );
                      if (!found) {
                        return;
                      }
                      found.label = value;
                    })
                  ),
              };
            },
          })),
        })),
        fieldDefs: s.fieldDefs,
        location: s.location,
        title: s.title,
        use: s.use,
        setTitle: (t) =>
          set(
            produce<Store>((state) => {
              state.sections[i].title = t;
              state.sections[i].use = true;
            })
          ),
        setUse: (b) =>
          set(
            produce<Store>((state) => {
              state.sections[i].use = b;
            })
          ),
      })),
    }),
  render: () => {
    const blog = get();
    const baseHref = blog.url;
    const template = blog.template;
    if (!template) {
      return "";
    }
    const builtTemplate = blog.sections
      .filter((s) => s.use)
      .reduce((prev, elem) => {
        return prev.replace(
          `[adhoc-cms-anchor-sectionId=${elem.location}]`,
          `{{ #${elem.location} }} ${
            template.parts.find((p) => p.id === elem.location)?.template
          } {{ /${elem.location} }}`
        );
      }, template.main);
    const builtLocal = blog.sections.reduce(
      (prev, section) => ({
        ...prev,
        [section.location]: section.articles.map((article) =>
          article.contents.reduce((cp, c) => {
            const relativePath = c.fieldId
              .replace(/^[^X]*/g, "")
              .replace(".", "_");
            return {
              ...cp,
              [relativePath]: c.value,
            };
          }, {})
        ),
      }),
      {}
    );

    return (Mustache as any).default
      .render(builtTemplate, builtLocal)
      .replace(/\"\//g, `"${baseHref}/`)
      .replace(/\.\//g, `${baseHref}/`);
  },
}));
