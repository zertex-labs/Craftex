import { Grid, Button, createStyles } from "@mantine/core";
import { ListSectionProps } from "./_schemas";

const useStyles = createStyles((theme) => ({
  root: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
    }`,
  },
}));

const ListShowcase: React.FC<ListSectionProps> = ({ form, span, selected }) => {
  const { classes } = useStyles();

  return (
    <Grid.Col className={classes.root} span={span}>
      <h1>List Create</h1>
      {selected &&
        selected.map((plugin) => (
          <h1>
            {plugin.title} - {plugin.id}
          </h1>
        ))}

      <Button type="submit">Create</Button>
    </Grid.Col>
  );
};

export default ListShowcase;
