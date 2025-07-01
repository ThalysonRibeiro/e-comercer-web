import { useEffect, useMemo, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownCard({ endDate, gap, title, style }: { endDate: string, gap?: string, title?: string, style?: string }) {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const apiResponse = {
    dataHoje: new Date(),
    endDate
  };

  const endDateStr = useMemo(() => {
    return apiResponse.endDate
  }, [apiResponse.endDate]);

  const getCountdown = (endDateStr: string): Countdown => {
    const endDate = new Date(endDateStr);
    const now = new Date();
    let totalSeconds = Math.floor((endDate.getTime() - now.getTime()) / 1000);

    if (totalSeconds <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    totalSeconds %= 60 * 60 * 24;

    const hours = Math.floor(totalSeconds / (60 * 60));
    totalSeconds %= 60 * 60;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {

    setCountdown(getCountdown(endDateStr));

    const intervalId = setInterval(() => {
      setCountdown(getCountdown(endDateStr));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endDateStr]);
  return (
    <>
      {countdown.days > 0 && (
        <div>
          <p className="font-semibold text-xs md:text-sm my-2">{title && title}</p>
          <div className={`flex gap-2 md:gap-${gap ? gap : 4}`}>
            <div className={`${style ? style : 'flex flex-col items-center border border-border text-primary w-14 rounded-lg p-1'}`}>
              <span className="font-semibold">{countdown.days}</span>
              <span className="text-xs">Dias</span>
            </div>
            <div className={`${style ? style : 'flex flex-col items-center border border-border text-primary w-14 rounded-lg p-1'}`}>
              <span className="font-semibold">{countdown.hours}</span>
              <span className="text-xs">Horas</span>
            </div>
            <div className={`${style ? style : 'flex flex-col items-center border border-border text-primary w-14 rounded-lg p-1'}`}>
              <span className="font-semibold">{countdown.minutes}</span>
              <span className="text-xs">Min</span>
            </div>
            <div className={`${style ? style : 'flex flex-col items-center border border-border text-primary w-14 rounded-lg p-1'}`}>
              <span className="font-semibold">{countdown.seconds}</span>
              <span className="text-xs">Seg</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}