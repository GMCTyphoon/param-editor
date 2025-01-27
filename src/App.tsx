import React from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: this.props.model.paramValues,
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => {
      const updatedParamValues = prevState.paramValues.map((paramValue) => {
        if (paramValue.paramId === paramId) {
          return { ...paramValue, value };
        }
        return paramValue;
      });
      return { paramValues: updatedParamValues };
    });
  };

  getModel = (): Model => {
    return {
      paramValues: this.state.paramValues,
    };
  };

  render() {
    return (
      <div className="grid gap-2 p-4 max-w-fit justify-items-end">
        {this.props.params.map((param) => {
          const paramValue = this.state.paramValues.find(
            (pv) => pv.paramId === param.id
          );
          return (
            <div
              key={param.id}
              className="flex gap-2 items-center w-full justify-end"
            >
              <label
                htmlFor={param.name}
                className="font-bold w-full text-center"
              >
                {param.name}
              </label>
              <input
                className="border rounded block font-normal pl-1 text-grey-900"
                id={param.name}
                type="text"
                value={paramValue ? paramValue.value : ''}
                onChange={(e) => this.handleChange(param.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

// использование компонента
const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
};

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline m-3">Редактор параметров</h1>
      <ParamEditor params={params} model={model} />
    </>
  );
}

export default App;
