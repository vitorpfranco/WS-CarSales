import CarList from "../components/CarList/CarList";

export default {
    title: 'CarList',
    component: CarList,
    parameters: {
        docs: {
            description: {
                component: 'A listing of cars grouped by brand',
            },
        },
    },
    argTypes: {
        cars: {
            description: 'Car object array.'
        },
        title: {
            description: 'Shows the brands title.'
        },
        titleColor: {
            description: 'Set the title text color. '
        },
        titleBgColor: {
            description: 'Set the title background color.'
        },
        bgColor: {
            description: "set the component's background color."
        },
        carBgColor: {
            description: "set the car's component background color."
        },
        textColor: {
            description: "set the car's component text color."
        },
        borderTitle: {
            description: "set the bottom border of the title."
        },
        borderColor: {
            description: "set the bottom border of the car component."
        },
    }
}

const Template = args => <CarList {...args} cars={teste} ></CarList>

export const Default = Template.bind({})

const teste = [
    {
        "id": 1,
        "marca_id": 1,
        "marca_nome": "TOYOTA",
        "nome_modelo": "COROLLA XEI",
        "ano": 2016,
        "combustivel": "flex",
        "num_portas": 4,
        "valor_fipe": 70,
        "cor": "Azul",
        "timestamp_cadastro": 1636636150
    },
    {
        "id": 2,
        "marca_id": 2,
        "marca_nome": "FORD",
        "nome_modelo": "Maverick",
        "ano": 1974,
        "combustivel": "alcool",
        "num_portas": 2,
        "valor_fipe": 170,
        "cor": "Azul",
        "timestamp_cadastro": 1636636150
    }]