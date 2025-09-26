import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const SchedulePager = () => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{
        clickable: true,
        horizontalClass: "swiper-pagination-horizontal",
      }}
    >
      {pages.map((page) => (
        <SwiperSlide>
          <div className="schedule_list">{page}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
