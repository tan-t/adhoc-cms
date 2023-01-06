import { gql } from "@apollo/client";
import { TemplateFragment } from "./template";

export const BlogFragment = gql`
  fragment BlogType on Blog {
    title
    id
    url
    template {
      ...TemplateType
    }
    sections {
      location
      title
      use
      fieldDefs {
        id
        label
        location
        order
        type
      }
      articles {
        id
        location
        contents {
          fieldId
          value
        }
      }
    }
  }
  ${TemplateFragment}
`;
