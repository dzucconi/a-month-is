// class Inflect
//   class << self
//     def ordinalize(n)
//       "#{n}#{ordinal(n)}"
//     end

//     def ordinal(number)
//       abs_number = number.to_i.abs

//       if (11..13).include?(abs_number % 100)
//         'th'
//       else
//         case abs_number % 10
//           when 1; 'st'
//           when 2; 'nd'
//           when 3; 'rd'
//           else 'th'
//         end
//       end
//     end
//   end
// end

export default n =>
  `${n}${ordinal(n)}`;

export const ordinal = n => {
  const abs = Math.abs(Number(n));

  if ([11, 12, 13].includes(abs)) {
    return 'th';
  } else {
    switch (abs % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
    }
  }
};
