import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Switch,
  Text,
  theme,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Layout } from "../../../components/Layout";
import { getGqlClient } from "../../../graphql/client";
import {
  useGetBlogLazyQuery,
  useUpdateBlogMutation,
} from "../../../graphql/gql";
import { useBlogStore } from "../../../stores/blog/BlogStore";

type Props = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  return {
    props: {
      id: ctx.query.id as string,
    },
  };
};

const PageEditPage = ({ id }: Props) => {
  const [doLoad, loaded] = useGetBlogLazyQuery({ client: getGqlClient() });
  const store = useBlogStore();

  useEffect(() => {
    doLoad({ variables: { id } }).then((res) => {
      store.init(res.data.getBlog);
    });
  }, [id]);

  const previewRef = useRef<HTMLIFrameElement>();
  const toggleHighlight = (path: string, start: HTMLElement) => {
    const paths = path
      .split("/")
      .filter((p) => p !== "ROOT")
      .filter(Boolean);
    const element = paths.reduce(
      (prev, elem) => prev.children[parseInt(elem)],
      start
    );
    if ((element as any).style?.background) {
      (element as any).style.background = "";
      return;
    }
    (element as any).style = "background: blue";
  };

  const onHover = (location: string) => {
    if (!previewRef.current) {
      return;
    }

    if (!previewRef.current.contentDocument) {
      return;
    }

    toggleHighlight(
      location,
      previewRef.current.contentDocument.querySelector("body")
    );
  };

  const [update, updated] = useUpdateBlogMutation({ client: getGqlClient() });
  const router = useRouter();

  const doUpdate = async () => {
    await update({
      variables: {
        input: {
          id,
          title: store.title,
          sections: store.sections.map((s) => ({
            use: s.use,
            title: s.title,
            location: s.location,
            articles: s.articles.map((a) => ({
              contents: a.contents.map((c) => ({
                fieldId: c.fieldId,
                value: c.value,
              })),
              id: a.id,
              location: a.location,
            })),
            fieldDefs: s.fieldDefs.map((f) => ({
              id: f.id,
              location: f.location,
              label: f.label,
              order: f.order,
              type: f.type,
            })),
          })),
        },
      },
    });

    router.push(`/blogs/${id}`);
  };

  return (
    <Layout>
      <Stack>
        <Box margin={{ base: "16px 0px" }}>
          <Heading size="xl">Configure {store.title}</Heading>
        </Box>
        <Box margin={{ base: "16px 0px" }}>
          <Flex mb={{ base: "8px" }} alignItems="center">
            <Text>Title</Text>
            <Input value={store.title} />
          </Flex>
        </Box>
        <Grid templateColumns="1fr 1fr">
          <GridItem>
            {store.sections.map((s, i) => (
              <Stack
                _hover={{
                  bgColor: theme.colors.gray[100],
                }}
                onMouseEnter={() => onHover(s.location)}
                onMouseLeave={() => onHover(s.location)}
                mb={{ base: "32px" }}
              >
                <Flex>
                  <Input
                    value={s.title}
                    onChange={(v) => s.setTitle(v.target.value)}
                  />
                  <Text>Use</Text>
                  <Checkbox
                    checked={s.use}
                    onChange={(v) => s.setUse(v.target.checked)}
                  />
                </Flex>
              </Stack>
            ))}
          </GridItem>
          <GridItem>
            <Stack>
              <Heading size="md">Preview</Heading>
            </Stack>
            <iframe
              sandbox="allow-same-origin"
              src={`/api/blogs/${encodeURIComponent(store.url)}/preview`}
              width="800px"
              height="800px"
              ref={previewRef}
            ></iframe>
          </GridItem>
        </Grid>
        <Box width="100%">
          <Center>
            <Button variant="primary" onClick={() => doUpdate()}>
              Save
            </Button>
          </Center>
        </Box>
      </Stack>
    </Layout>
  );
};

export default PageEditPage;
