import React from "react";
import ReactDOM from "react-dom";
import Select, { Option } from "@material/react-select";
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";
import Fab from "@material/react-fab";
import List, { ListItem, ListItemText } from "@material/react-list";
import Checkbox from "@material/react-checkbox";
import { Headline5 } from "@material/react-typography";
import "reset-css";
import "@material/react-checkbox/dist/checkbox.css";
import "@material/react-list/dist/list.css";
import "@material/react-select/dist/select.css";
import "@material/react-top-app-bar/dist/top-app-bar.css";
import "@material/react-fab/dist/fab.css";
import "@material/react-material-icon/dist/material-icon.css";
import "@material/react-typography/dist/typography.css";

const recheios = [
  "Leite em Po",
  "Calda Chocolate",
  "Calda de Morango",
  "Banana",
  "Granola",
  "Farinha Lactea",
  "Paçoca",
  "Leite condensado"
];

const App = () => {
  const [state, setState] = React.useState({ items: [], size: 500 });
  console.log(state);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ height: "100vh", overflow: "auto" }}>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection align="start">
              <TopAppBarTitle>Happy Açaí by Nata.house</TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust>
          <div
            style={{
              padding: "24px 24px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexFlow: "row wrap"
            }}
          >
            <Headline5
              style={{ fontSize: 20, paddingBottom: 24 }}
              children="Selecione o tamanho do Açaí?"
            />
            <Select
              outlined
              value={state.size}
              onChange={event =>
                setState(prev => ({ ...prev, size: event.target.value }))
              }
            >
              <Option value={500}>500ml</Option>
              <Option value={300}>300ml</Option>
            </Select>
          </div>
          <div
            style={{
              padding: "24px 24px 0"
            }}
          >
            <Headline5
              style={{ fontSize: 20 }}
              children="Selecione os recheios?"
            />
            <List checkboxList selectedIndex={[]}>
              {recheios.map((recheio, index) => {
                const checked = state.items.find(item => item === index);
                const isChecked = checked === 0 ? true : checked;

                return (
                  <ListItem
                    key={index}
                    onClick={e => {
                      const items = isChecked
                        ? state.items.filter(item => item !== index)
                        : [...state.items, index];
                      console.log(items);

                      setState(prev => ({
                        ...prev,
                        items
                      }));
                    }}
                  >
                    <Checkbox checked={isChecked} />
                    <ListItemText primaryText={recheio} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </TopAppBarFixedAdjust>
      </div>
      <div style={{ position: "absolute", bottom: "5vw", right: "5vw" }}>
        <Fab
          icon={<MaterialIcon icon="send" />}
          onClick={e => {
            const text = `Por favor, quero pedir um açaí.
            %0A%0A*Tamanho:* ${state.size}ml
            %0A%0A*Recheios:* ${state.items
              .map(i => `%0A - ${recheios[i]}`)
              .join(", ")}.

              %0A%0A*Local:* %0A Sala número 1005, 10 andar.`;

            window.open(`https://wa.me/+553171844171/?text=${text.trim()}`);
          }}
        />
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
