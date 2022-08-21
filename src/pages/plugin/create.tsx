import {
  Center,
  Group,
  useMantineTheme,
  Text,
  Card,
  Image,
  createStyles,
  Badge,
  Avatar,
  ActionIcon,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import {
  IconBookmark,
  IconHeart,
  IconPhoto,
  IconShare,
  IconUpload,
  IconX,
} from "@tabler/icons";
import { trpc } from "@trpc";
import { SUPPORTED_FORMATS, MAX_FILE_SIZE } from "@utils/constants";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NextImage from "next/image";


// TODO Seperate to preview and edit pages... this is abysmally bad

const useStyles = createStyles((theme) => ({
  card: {
    [theme.fn.largerThan("md")]: {
      width: 500,
    },

    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

export default function PluginCreate() {
  const { mutate: createPlugin, data: lastCreatedPlugin } =
    trpc.useMutation("plugin.create");
  const { data: session, status } = useSession();
  const [cover, setCover] = useState<File | undefined>(undefined);
  const { classes, cx, theme } = useStyles();

  const coverPreview = (() => {
    console.log("render");
    if (!cover) return;

    const imageUrl = URL.createObjectURL(cover);

    return (
      <NextImage
        key={cover?.name}
        src={imageUrl}
        layout="fill"
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  })();

  if (status !== "authenticated") {
    return (
      <React.Fragment>
        <h1>Please sign in.</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </React.Fragment>
    );
  }

  return (
    <Center style={{ display: "flex", flexDirection: "column" }}>
      <h1>Plugin Create</h1>

      <Card withBorder radius="md" className={classes.card}>
        <Card.Section>
          <Dropzone
            maxFiles={1}
            onDrop={(files) => setCover(files[0])}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={MAX_FILE_SIZE}
            accept={SUPPORTED_FORMATS}
            sx={(theme) => ({
              minHeight: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: 0,

              padding: 0,

              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],

              "&[data-accept]": {
                color: theme.white,
                backgroundColor: theme.colors.blue[6],
              },

              "&[data-reject]": {
                color: theme.white,
                backgroundColor: theme.colors.red[6],
              },
            })}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 120, pointerEvents: "none" }}
            >
              {coverPreview ? (
                <>
                  {coverPreview}
                </>
              ) : (
                <>
                  <Dropzone.Accept>
                    <IconUpload
                      size={50}
                      stroke={1.5}
                      color={
                        theme.colors.brand[theme.colorScheme === "dark" ? 4 : 6]
                      }
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      size={50}
                      stroke={1.5}
                      color={
                        theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
                      }
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={50} stroke={1.5} />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag image here or click to select
                    </Text>
                    <Text size="xs" color="dimmed" inline mt={7}>
                      File must not exceed 5mb and must be of format .png or
                      .jpeg
                    </Text>
                  </div>
                </>
              )}
            </Group>
          </Dropzone>
        </Card.Section>

        <Badge
          className={classes.rating}
          variant="gradient"
          gradient={{ from: "yellow", to: "red" }}
        >
          3.4
        </Badge>

        <Text className={classes.title} weight={500} component="a">
          Title
        </Text>

        <Text size="sm" color="dimmed" lineClamp={4}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ipsum
          unde ducimus earum dicta doloribus culpa repellat deserunt. Maxime hic
          quasi inventore! Ipsa, quis nobis totam reiciendis ratione cupiditate
          eos voluptatum saepe eaque neque commodi maiores molestias, cumque at
          nisi.
        </Text>

        <Group position="apart" className={classes.footer}>
          <Center>
            <Avatar
              src={"https://cdn.craftex.dev/brand/logo"}
              size={24}
              radius="xl"
              mr="xs"
            />
            <Text size="sm" inline>
              xrexy
            </Text>
          </Center>

          <Group spacing={8} mr={0}>
            <ActionIcon className={classes.action}>
              <IconHeart size={16} color={theme.colors.red[6]} />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconBookmark size={16} color={theme.colors.yellow[7]} />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconShare size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Card>
    </Center>
  );
}
