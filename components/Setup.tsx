export const Setup = (players, categoryId, impostorCount) => {
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

            <select>
                <option selected disabled>Categoria</option>
            </select>

            <select>
                <option selected disabled>Quantidade de Impostores</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </>
    );
}