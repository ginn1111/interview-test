import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
type EmployeeItemProps = {} & FmtEmployeeProfile;

const EmployeeItem = (props: EmployeeItemProps) => {
  const { name, images, positionNames, exps, description } = props;

  return (
    <div className="space-y-2 bg-white shadow-md pb-2 rounded-md h-full">
      <figure className="h-60 relative">
        {images?.length > 0 ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            className="h-full custom-swiper"
            navigation
            autoplay
          >
            {images.map((src, idx) => (
              <SwiperSlide className="relative" key={idx}>
                <Image
                  fill
                  src={src}
                  alt={`image-${idx}`}
                  objectFit="cover"
                  objectPosition="center"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="font-bold grid place-items-center h-full">
            Do not have any images
          </p>
        )}
      </figure>
      <div className="px-2 space-y-2">
        <div className="flex justify-between">
          <h1 className="font-medium">{name}</h1>
          <p className="font-medium">{exps} years</p>
        </div>
        <ul className="flex gap-1 items-center">
          {positionNames.map((pName, idx) => (
            <li
              className="text-[12px] font-medium bg-primary max-w-max px-2 py-1 rounded-sm"
              key={idx}
            >
              {pName}
            </li>
          ))}
        </ul>
        <p className="line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default EmployeeItem;
