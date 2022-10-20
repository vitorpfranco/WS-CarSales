export default function dateDistance(timestamp) {
    const date = new Date().getTime();
    const timeDifference = date - timestamp * 1000

    const dateDistance = Math.round(timeDifference / (1000 * 3600 * 24))

    if (dateDistance < 1) return `Hoje`
    if (dateDistance === 1) return `Ontem`
    if (dateDistance > 365) return 'Mais de um ano'
    if (dateDistance > 30) {
        const months = Math.round(dateDistance / 30)
        if (months === 1) return `${dateDistance} mês atrás`
        return `${months} meses atrás`
    }

    return `${dateDistance} dias atrás`

}