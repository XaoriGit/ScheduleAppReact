import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type { ScheduleDayDTO } from "@/api";

interface SchedulePagerProps {
  days: ScheduleDayDTO[];
}

export const SchedulePager = ({ days }: SchedulePagerProps) => {
  return (
    <Swiper modules={[Pagination]}>
      {days.map((day) => (
        <SwiperSlide>
          <div className="schedule_list">1</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
