import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formartDistanceDate(date: Date) {
    const dateFormated = formatDistanceToNow(date, {
        locale: ptBR,
        addSuffix: true
    })

    return dateFormated
}

export function formatDate(date: Date) {
    const dateFormated = new Date(date).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })

    return dateFormated
}