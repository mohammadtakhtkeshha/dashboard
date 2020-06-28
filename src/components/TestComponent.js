import React, { Component } from "react";
import lodash from "lodash";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { styled } from "@material-ui/core/styles";

const CustomizedTableCell = styled(TableCell)({
    fontSize: "14px"
});

class DoranBody extends Component {
    renderCell = (item, column, rowIndex) => {
        if (column.content) return column.content(item, rowIndex);

        return lodash.get(item, column.path);
    };

    createKey = (item, column, key) => {
        return item[key] + (column.path || column.key);
    };

    render() {
        const { items, columns, key = "_id" } = this.props;

        return (
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={item[key]}>
                        {columns.map(column => (
                            <CustomizedTableCell key={this.createKey(item, column)}>
                                {this.renderCell(item, column, index)}
                            </CustomizedTableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        );
    }
}

export default DoranBody;
