import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Layout } from "../components/Layout";
import { getGqlClient } from "../graphql/client";
import { useAnalyzeByUrlMutation } from "../graphql/gql";
import { useAnalyzeStore } from "../stores/analyze/AnalyzeStore";

const Index = () => {
  const highlight = (path: string, start: HTMLElement) => {
    const paths = path.split("/").filter(Boolean);
    const element = paths.reduce(
      (prev, elem) => prev.children[parseInt(elem)],
      start
    );
    console.log(element);
    (element as any).style = "background: blue";
  };

  const ref = useRef<HTMLIFrameElement>();

  const onClick = () => {
    if (!ref.current) {
      return;
    }

    if (!ref.current.contentDocument) {
      return;
    }

    highlight("/1", ref.current.contentDocument.querySelector("body"));
  };

  const store = useAnalyzeStore();
  const [doAnalyze] = useAnalyzeByUrlMutation({ client: getGqlClient() });
  const router = useRouter();

  const onClickCTA = async () => {
    const res = await doAnalyze({
      variables: {
        url: store.url,
      },
    });
    router.push(`/blogs/${res.data?.analyzeByUrl?.id}/configure`);
  };

  return (
    <Layout>
      <Center>
        <Box width="48em">
          <Stack width="100%">
            <Heading
              size="4xl"
              margin={{ base: "36px 0px" }}
              textAlign="center"
            >
              CMSify.io
            </Heading>
            <Flex>
              <Input
                value={store.url}
                onChange={(v) => store.setUrl(v.target.value)}
                placeholder="Paste Your Homepage URL Here"
              ></Input>
              <Button onClick={onClickCTA}>get CMS now</Button>
            </Flex>
          </Stack>
        </Box>
      </Center>
    </Layout>
  );
};

export default Index;
