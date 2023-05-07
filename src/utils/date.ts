import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formartDistanceDate(date: Date) {
    const dateFormated = formatDistanceToNow(date, {
        locale: ptBR,
        addSuffix: true
    })

    return dateFormated
}