//doneeeeee

export default function Attributes({ attributes }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6">
      {attributes.map(({ traitType, value }) => (
        <div
          key={traitType}
          className="p-1 grid place-content-center rounded-2xl bg-[#21252b] hover:bg-[#1a1e22]"
        >
          <p className="font-bold text-[#0ce466]">{traitType}</p>
          <p className="text-gray-300"> {value}</p>
        </div>
      ))}
    </div>
  );
}
