import { categories } from "@/data/categories";

export const Setup = ({ players, setPlayers, categoryId, setCategoryId, impostorCount, setImpostorCount }) => {
    return (
        <>
            <input type="text" />
            <button type="button">Adicionar Jogador</button>

            <table>
                <tbody>
                    <tr>
                        <td>João</td>
                        <td>
                            <button type="button">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="" disabled>Selecione uma categoria</option>
                {categories.map((cat) =>
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                )}
            </select>

            <select value={impostorCount} onChange={(e) => setImpostorCount(e.target.value === "1" ? 1 : 2)}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </>
    );
}