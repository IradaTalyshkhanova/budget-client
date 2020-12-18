import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLine } from 'victory';

const visualization = ( props ) => {
    const dataChart = [
        {item: 1, cost: parseInt(props.budgetData.groceries.value, 10)},
        {item: 2, cost: parseInt(props.budgetData.housing.value, 10)},
        {item: 3, cost: parseInt(props.budgetData.utilities.value, 10)},
        {item: 4, cost: parseInt(props.budgetData.transportation.value, 10)},
        {item: 5, cost: parseInt(props.budgetData.insurance.value, 10)},
        {item: 6, cost: parseInt(props.budgetData.other.value, 10)}
    ];
    const dataPie = [
        {x: "Groceries", y: parseInt(props.budgetData.groceries.value, 10)},
        {x: "Housing", y: parseInt(props.budgetData.housing.value, 10)},
        {x: "Utilities", y: parseInt(props.budgetData.utilities.value, 10)},
        {x: "Transport", y: parseInt(props.budgetData.transportation.value, 10)},
        {x: "Insurance", y: parseInt(props.budgetData.insurance.value, 10)},
        {x: "Other", y: parseInt(props.budgetData.other.value, 10)}
    ];

    return (
        <div>
            <VictoryChart theme={VictoryTheme.grayscale} domainPadding={20}> 
                <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]} tickFormat={["Groceries", "Housing", "Insurance", "Transport", "Utilities", "Other"]} />
                <VictoryAxis dependentAxis tickFormat={(x) => (`$${(x)}`)} />
                <VictoryBar data={dataChart} x="item" y="cost" />
            </VictoryChart>

            <VictoryPie
                colorScale={["tomato", "orange", "gold", "cyan", "navy", "green"]}
                data={dataPie}
            />

            <VictoryChart theme={VictoryTheme.grayscale}>
                <VictoryLine
                    style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    data={dataPie}
                />
            </VictoryChart>
        </div>
    );
};

export default visualization;