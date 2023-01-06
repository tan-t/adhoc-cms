import { gql } from "@apollo/client";
import { BlogFragment } from "../fragments/blog";
export const updateBlog = gql`
  mutation updateBlog($input: BlogInput!) {
    updateBlog(input: $input) {
      ...BlogType
    }
  }
  ${BlogFragment}
`;
