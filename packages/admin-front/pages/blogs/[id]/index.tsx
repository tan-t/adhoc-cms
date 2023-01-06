import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect, useRef } from "react";
import { Layout } from "../../../components/Layout";
import { getGqlClient } from "../../../graphql/client";
import { useGetBlogQuery } from "../../../graphql/gql";
import { ArticleStore, useBlogStore } from "../../../stores/blog/BlogStore";

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

const BlogPage = ({ id }: Props) => {
  const store = useBlogStore();
  const loaded = useGetBlogQuery({ client: getGqlClient(), variables: { id } });

  useEffect(() => {
    if (loaded.data?.getBlog) {
      store.init(loaded.data.getBlog);
    }
  }, [loaded.data]);

  const previewRef = useRef<HTMLIFrameElement>();
  useEffect(() => {
    if (!previewRef.current) {
      return;
    }

    const previewDoc = previewRef.current.contentDocument;
    previewDoc.open("text/html", "replace").write(store.render());
  }, [store]);

  return (
    <Layout>
      <Stack>
        <Box>
          <Heading size="xl">Editing {store.title}</Heading>
        </Box>
        <Grid templateColumns="1fr 1fr" columnGap="16px" height="70vh">
          <GridItem>
            {store.sections
              .filter((s) => s.use)
              .map((s) => (
                <Stack>
                  <Box>
                    <Text>{s.title}</Text>
                  </Box>
                  <Accordion>
                    {s.articles.map((a) => (
                      <ArticleEdit store={a} />
                    ))}
                  </Accordion>
                </Stack>
              ))}
          </GridItem>
          <GridItem>
            <iframe ref={previewRef} width="100%" height="100%"></iframe>
          </GridItem>
        </Grid>
      </Stack>
    </Layout>
  );
};

type ArticleProps = {
  store: ArticleStore;
};
const ArticleEdit = ({ store }: ArticleProps) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Article ID:{store.id}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {store.contents.map((c) => (
          <Flex alignItems="center">
            <Input
              value={c.field().label}
              onChange={(v) => c.field().setLabel?.(v.target.value)}
            />{" "}
            <Input
              value={c.value}
              onChange={(v) => c.setValue(v.target.value)}
              ml={{ base: "8px" }}
            />
          </Flex>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default BlogPage;
