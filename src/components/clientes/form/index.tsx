export function CreateNewCustomerForm() {
  return (
    <form className="mt-6 border border-zinc-300 p-4 rounded-md">
      <h3 className="text-2xl">Adicionar Novo Cliente</h3>

      <div className="grid grid-cols-2 mt-6 gap-5">
        <div>
          <label className="block">Nome do Cliente*</label>
          <input
            className="border w-full px-3  py-1.5 border-zinc-300 rounded-sm"
            type="text"
            name="name"
          />
        </div>

        <div>
          <label className="block">Pessoa de Contato</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="number"
            name="harvest"
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            className="border w-full px-3  py-1.5 border-zinc-300 rounded-sm"
            type="text"
            name="name"
          />
        </div>
        <div>
          <label className="block">Telefone</label>
          <input
            className="border w-full px-3 py-1.5 border-zinc-300 rounded-sm"
            type="text"
            name="name"
          />
        </div>
      </div>

      <button className="bg-[#0d6efd] mt-6 py-3 px-4 text-sm cursor-pointer transition hover:bg-[#0b5ed7] text-white rounded-sm leading-none">
        Salvar
      </button>
    </form>
  );
}
