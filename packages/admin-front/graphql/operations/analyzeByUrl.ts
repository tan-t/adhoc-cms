import { gql } from "@apollo/client";
export const analyzeByUrl = gql`
  mutation analyzeByUrl($url: String!) {
    analyzeByUrl(url: $url) {
      id
    }
  }
`;
