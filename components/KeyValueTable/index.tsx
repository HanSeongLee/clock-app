import React, { TableHTMLAttributes } from 'react';

interface IProps extends TableHTMLAttributes<HTMLTableElement> {
    data: {[key: string]: string | number};
}

const KeyValueTable: React.FC<IProps> = ({ data, ...props }) => {
    const pairs = Object.keys(data).map(key => [key, data[key]]);

    return (
        <table {...props}>
            <tbody>
                {pairs.map(([key, value], index) => (
                    <tr key={index}>
                        <th>
                            {key}
                        </th>
                        <td>
                            {value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default KeyValueTable;
