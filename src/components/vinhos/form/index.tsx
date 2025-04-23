export function CreateNewWineForm() {
  return (
    <form className="mt-6 border border-zinc-300 p-4 rounded-md">
      <h3 className="text-2xl">Adicionar Novo Vinho</h3>

      <div className="grid grid-cols-2 mt-6 gap-5">
        <div>
          <label className="block">Nome do Vinho*</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="text"
            name="name"
          />
        </div>
        <div>
          <label className="block">Tipo*</label>
          <select
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            name="name"
          >
            <option>Tinto</option>
            <option>Branco</option>
            <option>Rose</option>
          </select>
        </div>
        <div>
          <label className="block">Safra</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="number"
            name="harvest"
          />
        </div>
        <div>
          <label className="block">Produtor</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="text"
            name="name"
          />
        </div>
      </div>

      <button className="bg-[#188754] mt-6 py-3 px-4 text-sm cursor-pointer transition hover:bg-[#03a679] text-white rounded-sm leading-none">
        Salvar
      </button>
    </form>
  );
}
