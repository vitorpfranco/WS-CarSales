import styles from './CarForm.module.scss'

import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import * as Dialog from '@radix-ui/react-dialog'

import { yupResolver } from '@hookform/resolvers/yup';

import capitalize from '../../utils/capitalize'
import brandService from '../../services/brandService';

const schema = yup.object({
    marca_id: yup.number().typeError('Campo Obrigatório').required('Campo Obrigatório'),
    nome_modelo: yup.string().required('Campo Obrigatório'),
    ano: yup.number().typeError('Campo Obrigatório').positive('Valor inválido').required('Campo Obrigatório').min(1900, 'Ano inválido').max(2023, 'Ano inválido'),
    combustivel: yup.string('Campo Obrigatório').required('Campo Obrigatório'),
    num_portas: yup.number().typeError('Campo Obrigatório').required('Campo Obrigatório'),
    valor_fipe: yup.number().typeError('Campo Obrigatório').positive('Valor Inválido').integer('Digite o valor inteiro. Ex:25000').required('Campo Obrigatório'),
    cor: yup.string().required('Campo Obrigatório')
}).required();

export default function ProjectModal({ setOpenForm, setOpenToast }) {
    const [brands, setBrands] = useState([])

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const fetchBrands = async () => {
        const brands = await brandService.getBrands()
        setBrands(brands)
    }

    useEffect(() => {
        fetchBrands()
    }, [])

    const onSubmit = (data) => {
        setOpenForm(false);
        setOpenToast(true);
        reset()
    };


    return (
        <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content className={styles.content} >
                <Dialog.Title className={styles.title}  >
                    Anuncie seu carro!
                    <Dialog.Close type="button" className={styles.closeButton}>X</Dialog.Close>
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="car_model">Modelo do carro</label>
                        <input type="text" id="car_model" placeholder="Ex: Gol, Voyage, Uno Mille" {...register("nome_modelo")} />
                        <p>{errors.nome_modelo?.message}</p>
                    </div>

                    <div className={styles.fieldContainer}>
                        <label htmlFor="car_brand">Marca do Carro</label>
                        <select id="car_brand " defaultValue='' {...register("marca_id")}>
                            <option disabled value="">Selecione...</option>
                            {brands.map((brand) => { return (<option key={brand.marca_id} value={brand.marca_id}>{capitalize(brand.marca_nome)}</option>) })}
                        </select>
                        <p>{errors.marca_id?.message}</p>
                    </div>
                    <div className={styles.equalFields}>
                        <div className={styles.fieldContainer}>
                            <label htmlFor="car_color">Cor do Carro</label>
                            <input type="text" id="car_color" placeholder="Digite a cor do carro." {...register("cor")} />
                            <p>{errors.cor?.message}</p>
                        </div>
                        <div className={styles.fieldContainer}>
                            <label htmlFor="car_year">Ano</label>
                            <input type="number" id="car_year" placeholder="Ano de fabricação" {...register("ano")} />
                            <p>{errors.ano?.message}</p>
                        </div>
                    </div>
                    <div className={styles.equalFields}>
                        <div className={styles.fieldContainer}>
                            <label htmlFor="car_color">Combustível</label>
                            <select defaultValue='' {...register("combustivel")}>
                                <option disabled value="">Selecione...</option>
                                <option value="Flex">Flex</option>
                                <option value="Gasolina">Gasolina</option>
                                <option value="Alcool">Alcool</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Híbrido">Híbrido</option>
                                <option value="Elétrico">Elétrico</option>
                            </select>
                            <p>{errors.combustivel?.message}</p>
                        </div>
                        <div className={styles.fieldContainer}>
                            <label htmlFor="car_color">Nº de Portas</label>
                            <select defaultValue='' {...register("num_portas")}>
                                <option disabled value="">Selecione...</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <p>{errors.num_portas?.message}</p>
                        </div>

                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="car_value">Valor Fipe <span className={styles.helpText}>(consulte <a href="https://www.uol.com.br/carros/tabela-fipe/" target="_blank">clicando aqui</a> )</span></label>
                        <input type="number" id="car_value" placeholder="Ex: 12000" {...register("valor_fipe")} />
                        <p>{errors.valor_fipe?.message}</p>
                    </div>
                    <button> Anunciar!</button>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}