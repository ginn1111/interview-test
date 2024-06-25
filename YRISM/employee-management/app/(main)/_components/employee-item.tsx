import Image from 'next/image';

const EmployeeItem = () => {
  return (
    <div className="space-y-2">
      <figure className="h-52 relative">
        <Image
          fill
          src="https://via.placeholder.com/500x300"
          alt="image"
          objectFit="cover"
          objectPosition="center"
          className="py-4"
        />
      </figure>
      <div className="flex justify-between">
        <div>
          <h1 className="font-medium">Name</h1>
          <h3 className="text-sm">Position</h3>
        </div>
        <p className="font-medium">Exps</p>
      </div>
      <p className="line-clamp-3">
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>
    </div>
  );
};

export default EmployeeItem;
