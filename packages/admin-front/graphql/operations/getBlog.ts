import { gql } from "@apollo/client";
import { BlogFragment } from "../fragments/blog";
export const getBlog = gql`
  query getBlog($id: String!) {
    getBlog(id: $id) {
      ...BlogType
    }
  }
  ${BlogFragment}
`;
