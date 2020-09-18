import React from "react";

import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@material-ui/core";

import { useCollectionData } from "react-firebase-hooks/firestore";
import Create from "./Create";
import Update from "./Update";
import { firestore } from "@/config/firebase";
import { maybe } from "@/utils";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    alignItems: "center",
    gridTemplateRows: "auto auto",
    gap: theme.spacing(2) + "px",
  },
}));

const BrandList = () => {
  const [brandsRaw] = useCollectionData(firestore.collection("brands"), {
    idField: "id",
  });
  const classes = useStyles();
  const brands = maybe(() => brandsRaw, []);
  return (
    <div className={classes.container}>
      <Create />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <Update brand={brand} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BrandList;
