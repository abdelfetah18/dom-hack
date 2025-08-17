interface TableHeadProps {
    values: string[];
}

export default function TableHead({ values }: TableHeadProps) {
    return (
        <div
            className={`w-full grid py-2 border-b border-gray-300`}
            style={{
                gridTemplateColumns: `repeat(${values.length}, minmax(0, 1fr))`
            }}
        >
            {
                values.map((value, index) => {
                    return (
                        <div key={index} className="text-sm px-4 capitalize text-gray-600">{value}</div>
                    )
                })
            }
        </div>
    );
}