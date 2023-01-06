import { gql } from "@apollo/client";
export const TemplateFragment = gql`
  fragment TemplateType on Template {
    id
    main
    original
    parts {
      id
      template
    }
  }
`;
