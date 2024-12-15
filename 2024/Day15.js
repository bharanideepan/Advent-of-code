let fs = require("fs");
let pos = [0, 0];
let map = `##################################################
#.....O..O....O.#.OOO...#....#....OO......OOOO...#
#O......OOO..#..O...O.#........O.OOOO.OOO........#
#..#..O.O..O.......O....#..O.O..O.O#...OOO....O..#
#.......O..O..O.O.#..#......O#..OO...#..##..O.O..#
#.#...O....O......O...O#.OO.....OO..#.O..O.......#
#OOO.O....OOOOOOOO.O...O..O.O..O.........O....O.O#
#.O...#.##.#.....O.O.O...........O....OOO#OO..O..#
#.OO.O.O.....O.#OO......O.O#.O.O........OO.O.....#
#...O....#OOO.OOO.O#.........OO#.O....O.O..O.OO..#
##O#O#.....O..O..#...O.........O.O....O..#OO#..#O#
#.OO.O.....#.O.#.O....O...O...O..O....O##O..O#O..#
#.O..O.O......OO.#..O...O.O..#....#...O.O#.##..#.#
#......O....#O..O.....O.......O..O....OO..#..O..O#
#.#.O....O..#O.O...O.#...O..#..........OO...O....#
#OOO...#O....O..O..OOO..O......#O..O#O.....O..O..#
#......O......O..#.....O.....OOOO...OO.OOO.O.....#
#.O.O..O.O..#.....#OO..OO.#O..OO..O.O#O....O..#..#
#.O.OOO..O..OO.........O...OOO...#..OO.O.O.....#O#
#.......OO..O...OO......OO.......O.O.O..#..##.O.##
#O..O.O...#...OO....OO.....O...OOO...#O..O.O.....#
#..#.O.#O..OO.OO..O..#OO#..OOO.....O....OO.O....O#
#O...O..O#..###..#OOOO.O.O.O.O.....#OOO....O.OOO.#
#....O.OO.#..#........OO......O.#..O.O.O.........#
#.O.O#O....O....O#..O.#.@.....O..OO.......OO..OOO#
#OOO........#..OO#....#.O.O..#..O#..............O#
#..O.OO.O.O.O#.OO.OO#OO.O....OOO.#O.O...OOO..O#..#
#..........O..O.....O..O......O......#OO.OO..O...#
#....O.O...O...O.O.O.OO.#O.......#O.O...O....O...#
#......O..OO......##....O#O....#.O.....#..#.O...O#
#..O...O...O..O.#.....#OO..O.O#..O....O.O.....O..#
#OO.....O..O.....OO...#........O.O#O..OO..O....O.#
#.OOO..O...O....#...O#O.O.O.#...O.O.....O..OO...O#
#.O..O......O..#..O.......#.OO..O.O........#.....#
#...O.O.O..OO..OO.#.O..O...........OO....O.OOO.###
#O....#..#..#.....OO..O..OO....O......O..O#......#
#...O.O........O..#.O.O#.....O.O.O.O..O..#.O.O..O#
#...OO..O.....O............#.....O.O.O.....OO..O.#
#OO#O.O.O#..#.#..O.#....##.OOO......O..O.#...O...#
#..OO....O.......O.....O#...O.......OO#O...O...O.#
#.#.OO.....#OOO..#.......O.O.O....O..............#
#O........#.O.OO....OOO..O.......#.OO.O.O....#...#
##O........O.O..#.....OO#O.O.OOOO.#...OOO.#O#O#.##
#..O....O.#OO....OOO.##.#O..O..O..#O.O..OO.......#
#O...#..#O.O.OO..##.O.O..O......O.O.O...#OO.##O.##
##..............OO...O..O........#.....O..OO..O..#
#.O.#O.OO...OO.O.O.O..OOO....O.O.O...OO.O....#..##
##O.....O#....#O#..O##......##.#OOOO.#.OO.O.OOO..#
##.O......#........OO#.O..#.#..O.O.OO.#.O..O#.O.##
##################################################`.split('\n').map((e, x) => e.trim().split('').map((item, y) => {
    if (item.trim() == '@') {
        pos[0] = x;
        pos[1] = y;
    }
    return item.trim();
}))

let moves = `<vv^><<vv>v>v>^^><>><<^vv>^v>^>^>>>^><>^vv^v><v<^><>><v^^^v>^>>>^^^^>>^v^>^v>vvv<<<<>v><^<^<><><><v><><<<^>><><>v<>^>><<<v^vv><^<<^v>>^v^^<<<>>vv^^^^<<^>>^v^><<v<<><>^<vv<<v<^<<>^<vvv>^><>vv^^v>><v>^^^>v^<v^<^<v>v^vv<^<v>><^vv<^><<v^^<<^><vv^v>v<><^<>v<v^<v^>v><<^>^^^<><<><v<vvv^>^vvv^><v<<v<><<^<v><v>^>><^v>><>^v<^^v^^<v<><^>>^^vv>>^^^<^v><<^^^>^^><^>vv<><<v<>>^v^<<^><^v^^v><<v><><><vv<^<v<>v<<<<>vv<>^<<<v>v>>><<<^v>>^^>vv><vv<<v>^vv^v<^><v<<^<<^<>>^v>>^vvv^<>v<^^^<<v>vvv>vv^^<vv<<^>v<<><>>^>v>>vv<<^vv^^^<<v>^^<^^^^^vv><>^vv>^v^^<<>>>^v^v>^^^<<><vv>v><v^^^^<<^>>^<>v^v<^^<v>^^<><><><^^>>v<v>^>^><^><v><<<<vvv^><^^^v>^^<^^v>^>v>>v>>>v^<^>vv<>^v>>>^>vv^>v^<>v><^><<v<v><><<<vvvv>v>^^vv<>>v^^v>v^^<^>>><>>vv>^<vv^><><><<<vv<>v<^v>>v<v<v<^<v><^vv<vv<^>^<vv><v>>v>>^>^v<><<^v>^^>v^v<^^^>^vv>^^<<v>^v>><^>^>^<>^^<^^<v>v<<>^>>^v<v^v>v<>v^^>^<v<v>vvvv><>>^^>>^<v<v^>>^v^<v>^v^^^^<^<vv^><>vvv<v>^<vvvv^>^^^^>^^^^^>v^v>v>>v^><<v<<<^^vv>><<v>^>>^<^>>v^<<v<^vv>vv>v<<^<>v^>>><v><v^v^v<v<v^>^^^v>v>^^v^^>v<
v>>^v<^><^><<>>><>>v^<<<>^^<<^^><><>vv<^<^^^<<^<v<><<<vvv<v^^v>^v>v<<>v<v>v^^><v>^v^^<v^^^<vvv><<^<v>v^^v>>>^^<v^v><<<>^^>^>v<v^<vv^>^<<^vv>>v^>v^v<<<v^v<v>^>v<<vv<^^<^v><>^<>v^v>>^v<v^v^^v^>^>^>>vv><^<vv>><vvv<v^<vv<>vv^vv^^<>vv>^^<<<<v^>v>^^><><v<vv^v^^<<vv>^^<^<<^<>^<<vvv^^v<<><v><>^>>v^vv^v>><v<v<<<^^^^^<><^<><><^<<<>^v^v><^<^^^^v^<v^>^v^<v^^<<>>>^^v>><>>>><<vvv^<v>^v>>>v<^^<<^^><>^^>>^<^<>>^v><v<<<v>>>v>^^<^>>^><^v>>v><<v<v<^^<v<^^v>^^<><><>vv^^^<v^<v^^vv<vv^^<<v>>^^v>>v><><<v^v>^>><><^>^^^<^^v<>^v^<<>>vvv<<^<v^v><<>^<v<>>v<v^^vv>^>>vv<<^<<v>v^v<v>vvv^<<<>^<vvv<>^^vv<^<^^<v^>>>><<^>>^^^>^v><v<^^<>>>>v^v<<vv>>^vvv<^vv<<v^^<^^<v>>^<<v>^>>^>vv^v<>>^<v>^>>^v<>><^>>>><<<>^v^^v>v<^v^^vvv<<>^><<v<<v^v>v><>^v<<^^^vv<<<<<<vv<v^^>v<<vv^<<v>v^v<<v>vvv^<vvv>v<v<>v<<v<v>>>^>^^v^<><<<>^<><>^>^>^>><>>><v<^<v<v<><<>^>^v<^^<>>^^<^<<><<<<<^^v><<^<v^v^<<^v^<<^>^>><^>^v<v<^v^>vv<>v<>>>v^^^>^v<vvv^^<^<vvv<^<>>><v<v><v<^<vvvv><^<<v<<^<<<^v^>v<>^v<^>>^>^>v>^^<><v>^<><<^<<<<<<>^v>>^><<><^^>>^vvv>^v>v>^<<
>><^<>><>vv^v<v>^>vvv>^<<<<><>v>v^<v><<>v^>>^^^^<^v><vv<<<><<^<v>>v^<vv^>^<v>^<v<<v>>vv<v^^v>^>v^v<<>>vv^><v<<>>^><><<^v><v^^^<v>vv<<<>^<<v>vvv^v<<^^v^^^><<^<vv<><^>v<^>^<<^v^<vv><v>>v<>^<<vv<^<v>^>v<^<>>^v<^><>><^^^v<<v>>v>^>^>>v<<><^v^>^<^>^<>^>^^>vv><<vv^>>>^<>^vv^v^<v>^>v^>>^><vvv^v<v<>vv^>^><v>^vv>^vv<>^<vv><<v<v^v>vvv><^v<><>^^^^v^^v^<v^<^v<>^v>>^v^v>vv<^<>><><vv<v^^>v<vv^^^^^^v>>><v>vvv^vv>^<^<>v^<^^<^<<<<>><<<v><>vv^>v^<>^^<>>>v<>v<<><v^<<^vv><<v>>>^v<>v^<>v^v>v<v^vv>^^><<^v>vv^v>><v><v<v<vv<<><^^<v^vv^^<<>v<<v<vv>>^^<<^<^><v<<<^<^>^>>^^<>^^v>^>^><^<<<<>v^>>><^v^v<v>^<^^<>>v<^>v^^<vvv<^v>>v<><vv>^^vv>>^<^v^^^v>><^<^^<vv<<vv^^<v><v^v>vv>^v<^^>v>v^vv^v<^<>^<<>v>>><<<<>>>>vv>><<v<vv><v>><>>v^<^v><^^^<>>^>>vv^><^>vv<<v<><^^>^><<vv<<>>v^<^<^<^<vvv^<>^><<<^>>v<>^>v<<><vv<<>^^v^vvv>^>vv^<>v<^>v<^<v<^><<v<>>^v>v^<<v><>^<^<>v^<^^<^>^^>^<>v>v<v^^^>v>>>v^>>vv>>v><v>v>^^^<v>>^v^^^<>><<v>^vv<^vv^^^^^>><<v>^^<<v^v>v<>>vv>v<>^^v>^>^<<^^^^<v>v^v^<<<v<^>^^>^<v<v^<^<v<><<><v^<^v^^^^v^<^<^v<vv>v>
v<^^<>v^v<><<^^<v^>><<>>v<vv^vvv>v<>^>><>><v^<v>^>v>v^v<><v<<<<<<v^v^<<>vv<v^<^<>^<<^^vv<v<>>^^v<<vv^>v^>^><>^v>^^>^v^<><>v<<^>>v<v^<^<<><<^><<<<^v>>v^v<>v>v>>v>><vvv^v>^^^^<>^<v><>vv^<>^v>^<>>>>^<v<>>><v<^><v<^^<<<<v^>>>^<v<^^>^<^^<><<^>v^v>^^>><<<<v><^^^>>v^>><^^<<vv>>v<>v^^^v<^v><<^v>vv^vv<^>>>^vv^>v<>^<>v><^>^v><<><>v>^><v>^<v><vv^^^>v^^^>v^<vvv^v<v^vvv^v>^^^<v>><v^>>v>^>^v>v<^^^>^>>v^>^v>v^^^^<v^v<v^^v><<<v<v>v^^>v<><v^>>v^^^^>^<v<>>><^v<><v^^^^^>v^^^><>>^<^v<v^<>v>>v<>><vv>><><^<>v<<^v^vv<v<><v>>v^^^<>^>^^>>>v>>^<v>^>^^v>>>>v>><>>>^v^<v<>^^><<^^v^<<^<^<><<v^v<<>^^^<^<>v^^<<>v^<>>><v^>>>>><^>^^vvv<>v<v<>vv>v><^><<<><<vv<^>^v<<><>>>>^^>v>^^<v><>>>v<<>><>v^vv<^^v<vvv><<>^<><vv^<^>vvvvv<<v<v<>^^v>v^vvvv<><<<v>v<^>v>>>>^>^>v>>v^>><^vv>^^<v>vvvv<>v<^^>>^<<><<<^<<vv<<vvv^>>>v<<>><<vv^v><>v<>>^><^<vv^^>v<v><v<>^<^v^<><v^<v<<>><^vv<<v>><<^<v<>>^<^>^^>>v^v><v^v<^^^v>vv>^^<><v^<v>v>v><<^^<v<v<^><>><^><><^>^^v<^^<^<><v>>>v<vvvv^<<>><v^<<<<^v>v><vv<^^<<^^>v>>vv>^^v>^vvv<v^>^v<>>>vv<v<<<>v><<<
v<^<^<<vv^<^>v^>^^>>^^><<^<>v>^>v<^>^vv<^>v>>><<^v>^^^<<<<v^<vv^^><>v>v^vv>v><<<<><v<<v<^><<v>>>><^v>>vvv<<<^><<v<<<^><^v>^v^v^>^<<v>^^<^>^<>v^><<>vv<^<^<<v<<>^^^>^v^>>>^><<<^v<vv^^>v^^><^^>><<^<^^^vv^v><>>^v^<^v<><>v^><>v>v<>^>><^^>v<<v^>v>vv^<<<^>^<vv^^v<v^<<><vv<<^>^v<>v^v<><><><v>^>>^><^v>>><<v<>^^>^^^v<>^<v>v<><><>>>v<^<<<<v^^^^v<vv^^<<<<v>^^v>><v>>v<<<^vvv<>^<vv^vvvvvvv<>>>>v><^>><^><vv>>><>>>>^v^<^^><>^><>>>><vv^^>v>>>>>v^vv^<v^><>^>><^<^<v><><<>v^<vv>vvv<^<>>v<<^^>>^<>^^vv<v^v<vvv^>>><v<v<v^v>vv><^<><>^<v<<v<^vvv<vv>v>>v>^<<>^<>^^v<>>^v>v^v><><^><v^>vv>>^<<v^v<<<v<^<^v^<^<><^^^>>>v^v>v<^><><<^>^<^v^<><^v<v<>>v<<^^<>^<vv>v<<v^v^vvvvv^v>^><vv>vv<<^^vv>>^vv<<^>>^^^>><>vvv<>^>v><<<>^v^><^>^<<^^v^<<v>v<v>><><<v><^>><<^<^<<>>vv<<^vv>^^<<^<>^^<^v<v^v<^<><>>vvv><<>^>vv><v>>>v<<<>v>vvv<><><vvv<><vv^<v^^><<>^v<v<<<^<<<><>>>^^<^v<v<>v^<<v><<^<>v<>v<>^v<<<>^vv^>>^^v>v<^v<^<v<v^^><^^<<^<v><<v^>>v^>v^<v^^^v>^^>v<^vvv<v<v<<>>v^>v<^^>>^v<<^>vv<vvv><<v<v^^^<vv<v^><<v<^<^v>v<^v^>v<<>>>><>^^v^>>>
vvvvv>vvv^vv<^>^v>><><>v^^v>^v^<<<^>>>vv>^>^<v>v>v<<^v<<v>><><<^v<^^v<^^^^^>v>^>v^v^^<^v^<v><<<<^>>>v<<<^vv^<^>>>v<^>^v<^<v><<^>vv<>>>^v>v>^>^<>^^><>^^v<v<^>v><v>>^vv^>vv^><v><>^><<^<v<>^^^vv>v^v^v<v^vvv>>>vv^vvvv^>>v^^<^<>v>v<<v<>^<^<^>v<>>^>v>^^<^v><>^<><>v^><>><^vv^>vv>>>^<vv<>>v>v<vv^vv><^vv^<^^<<^v<<>>^>v><vv<<^v<>v<^v><^>^<<v><v>vv<^<<<^<>^>>v>>>>>>v^<<vvv^<<v^<v><<v>>^<^><^>v^<><>>^<^^<^<>vv^>^>v><<<<v><vvv><^>^><>^^v><^^v><v^v>^<<^^^v<<>^>^vv<v^vv^v>><vv>>^<<^v<v<>vvv^<^v>>>^<v^v<vv>^v^><>v>v>>v>vv<^<^v>^<<>v^>>v>v<<<vvv>>v<>><<<<v^<<v>><<>>>^<>><^<v>^^^>^^^v^><<>>><^v<>>^>>^v><<^^<v<v<>v^^<><^^>>>vv^>v>>v^<>>>>vv>><v<^<^<^^^v>>v>v>vv^>>^^^><v^<^^<<>v>^>><>>^^vvv><>v>v^^>v^v<<v^v<<>>><>^>>v^>v^v^v^<<<^<><v<v><v^^<vv><<v<^v^>^^>>vvv>v><>^<v>v>>v<<><v^>><^v<<v>^^>v^^v^>vv<^><>>><v<v<><^<v<<>>^<<v>vv>^<v>vv>v><<vv>^>^v<^>>^v<<v<v><<v<><^^^^><^<^>v<^<^>>v<<^>^<v>v>^^^>^^>^^><v><v^><<^^^<>v<<^<^v^v><<>^^vv>^<<<<><<>>^^^<^vv^v><>v<<^>v^^^vv^^^v>>^^vv>>^^<^^^v>>>vv<^<vv>^<><>>vv>v<<<>
^^>^>><<<v<<>>>^^>v^<v<>v<<v<<<v<>>^>><v<>>^^^v>><<>>>><^^vv^>vv<<v^^v<<v<^>v<v^v<^>^^^v>v^v<v>>^v<^^v>v>v>>^<v<<v>v^>^>^^<v^vv>>>v^<^v<^^^>>v<vvv<^<^<^v<^>vvv<>vv<><v>v^<^^v^^vv<>>vv<v<><v><>vv><vv<<^><^<<<><<v<>^v<><^^v>>^>^^^>>^v>^v<>>^>vv<^^^^<><><><<^^^<^><^<v^v^v^^vv>v^^v>>>^<>>><<^^>^<<^<v><>>^^^>v<v<v<>><>><><>>^^v<<^^v>vvvvvv><v<<<^>^<^><<>>v^v^>v<^^<><vv<v<v<<><><vv^v^^v<^^v>^v^^<^>v^>v<v^vvv<^>vv^>>><v>>^v>>>^<v<v^^v<^<^^<<v><vv^>vv<v>v^v><^^>^^<^v<vv<>><vv^<>>^>>>^>>>><>><<^^<vv><v^<><<v<<vv^^v><<^<^<<vv^v<<<<<v^>^<>vv<>^vv^>>^>vvvv<<<vv<^v<v^^^^v>><<v>^v><v<>>v<^v<v^>><^^^v>v^v^vv>>v^><<^v<^v<<>><v>><v<v<>>><vv^<v>v^v<^<>>v<>v^vv^><>><v<vv<<v><>v<<<v^<><^>v<v><>vv^>>vvvv><<><>v>v^><<^<^>^<<vv<v>^^>v<vv>>vv>v<vv^>vv<<^v^vv<>v<vvv><^vv^vv^<<<^<v^vvv>>>>v<v><^>v^>vv<vv<v<<v<<v<v>^v<<v<^<^>^vv>><>>>^v>vv>>^<v<<<<^^><^>v><>><<>^<<<v^<v^<^<^>^^<v<>v>>v<^<v^><v>^>v^^^^><<><^<>>v^vvv<v<^<>^<v>v<<<vvv<v<<^<<<>^<v<^><><^<^><v^>v^v><^<v^<^>><v<>v^>v<v><^vv^<>^vv>v>><v<<>v^vv^<<><^vv^
^><^^^^>v<^<>^>v>^^^^v^>v><vv^vv<>v<^v<^<>^><><^^><v<^<v>>^^>^<<<<^<v>>^<^><^<><^^><v>v^>><<>v>^^^><<<^^<>^<^^^>^v><<^^<^><<^^>v>^<^<^^<>^^<^>^><>v<<<<v>^<<^v^><v>v<>^>v<^^vv^><<>^<^vv>vv^^v^<v<^vv>^>^^<>^^vv<<v>^^^<<^<<v<<<vvv<vv<<^<<^^^>^^^^^<vv<^vv<>^<v<<>><^<>>>^^>^v<>v<v>^><>v<^v^<>^v^^<><<v^^<v>^^>>^v<>>^<>^v^><v><^^<v^>>^v^<<^<<v^>>^<^>><^><^^><>>>>vv^><^>>^v<v^>vv>>>>><v^v<<>v><<>>vv^^>^>><<v>>^^v<<v^<v>>^<<^>^><v>^<^>v^v<>^<<v<v^>>>^>v<><<v>>>v^>v<<<^<<v><v><vv>>>>v^<<^v>^<<v<>>>>>>v<<vvvvv<>^v<>^<<<^v<>>>^^^^>v^^^^<v<<^<^><>^v^^<v>><^^^<vv>^<<><><><>vvv>^>v^^>^>><<^<v><>vvv^v^^<>v><^^v<v>>v^><>><^v>^<<<^^<vv^<><vv^><^^<vv>><^vv><^>vv>v^<>^>vv^v^<>^<<v^^v>vv<^<v><<^<><>^v>^>^^<>><<^<v^^^^^><vv^><>v^<>v><<<v^><<<^v^>vv><v><v^^^><>>><>v^^>><>>^>v>>>>>v<<^^v><<v^<v^v>^<vv^><>v><v><vv<>v>>>^^v>v^>v^<^^^v<v<v<v^^^v>vvv>>><v^<^><>><<<>><<v^^<><<^v>>^v><><^>><^^^<v<^^><vv^<v<v<v^v>>v>vv>^v>v<>^<v><<^^vv^^^<^v<v<v<<<>^<>v^^>>^<<^^^^<v><^v>v<v<<^v<<vv^^^<<>v<^>>vv<><<<>v<^<<^^>>v^>v>^^
v^v<^>v^v^>^^<v>>^v<<v^vv>v<><^v><><v<^<v^v<>v^<^v>>>v>^vv<<^<vv^^<>^>v<^^>v^^<v<v>^<><>^>^^^>^^^>v^<<v<v^v^^<<>v>vv>><^^><>vv^^<v<v>v><<v>vvv>^<><^<v^^>^>>^vvv<vvv>v^^<<>v>vv<^<<<<>>vv^<vv^>^v>vv<v^v<v^^^vv^^vvv^<^^>^<vvv<v<^<^>>vv<><<v>^<v<v^v^<>^<vv<><^^v<>^^^<<v>v<>v<>v<<<<<>><<^<>v^>v>^>^>^^<^><><>^<^v<>^>vv<^<^<>v>vv^<v^<><>v>>><v^v<>v^vv<>v>^><<v<v^>^>><^^vvv<<<<>v><>v>vvv>v^vv<>v^v<<><<vvv^^<<>^>>^^>v>^v^>>>^v<>^<^^><v^<>^<>^>>>^<<<>vv>v<^^vv<v^vv<>><v<>>^>^^v>^<v><>^v>^^>^<<^^^^<><^><<v>^^>v^vv^>^v><>>v>^v^^>^<^^>v<^v^v><><<v^>vv^^^>>^><>^vv<>^<^<<vvv^<<>>vv>^^<<^<>v<^<v<>^^><<<^<^<^v^<^<>v^>>>><^v>v>^v^<>^><^^>><><vv>vvvv^>vvvv^v<<><v^vv^^>><<vv^>^^>><>>^v>>>^>>^^>^>^<<>>><v<^<v<vvv^><<>v<<^v>>vvv^v<^vv^v>v>>^>^>^>>vvv^<><><>^v^<<<^>>>v^<^<^<<><<><<^<v><<v<^<<>>><<v^>>>>^v<v><<v>v>^vv^<<vv<v^<>^v><<<><^v^^>v<v^><vvv><v^v><<^^>v<>^^^v^^>^^v<v<v<<^<^>v>>^^<<>v^^^^v<>>^^vv<<>>vv^^<^<<^>v^^v<v<>>v^>>v<^>>><>v^>v<>>>^<<vv^>v<<><><vv>^v^>>v<>v<^>v><>^<>vvv<>^<v^<<^v^^vv>v>vv^v^<v><
<>^><>v^<<^^<>v><>^^^<^vvv>v<^v<v>^><>v>vv>v<<<<>v>><><vv^>>v<v<>>^<<><>v<>>>>><^^^^>^v><^<v<v<^v^vv<<>><>^<<>>^><^<v^v^><<<>v^><^v^vv>v><v><v^><><><^<<><<^vv<v^>v^v^v>v>v<vvvv>>>^^v^v<>v^^vv>><<<<<<>><^^^v^<vv>>>v^<><>^v<v<<<^v><v>^>^<<^<^<v<^<v^<v<<v><v^^^<vv>>^^^v^>>>>v>v>>>><^<>>^>><v<>>>v>>vv<<>^^><><><vv^v>>><<vvv<v><^<<^<v<^<<>v^^>v<vv<>v<>^v>^^<<><^vv><^><^<><v>>^>^v<vv<><>><<>^v><>v^<>><<><>v^^>^>v<<><v>v^vvv^<>^^>v<<<<><^<<v><><v^^^<v>v^<^^v<<>v<<vv><^<><v><>v>^<vv<^>><><>^<<<>vv^>^<^>^>^v^>^>v>vvv<v<v>^^>^v><^>>^^v^<<^><^^v<^^^v><v<>v^<><^^<v^><v<<v^><>^v^^vvv<>^<vv^^v><v<><<v^v>vv>v<<<<<>v><vv>>^^>v<vv^<^vvv>>vv<v>v<>v<>>>vvv<>^<v^<<v<^v^v^>><<^<>v>^<><<<<^^>v<^><v><v^<>v>>><^v>><<>v<><>v^^><>>v<>v>><^^v<^>>vv^>v^^>vv><>>>vv>v><v^^<^>^^^<v<>^^v<^v^v><^^v<^>^^><>v^^^^<^v^>^v^><v^<^<>^<vv^<>><<^v>v^<<>>^<^<<<><^><>>v^v><v>v>^>^^v>>^>>^^^^vv<>^^>>v>^vv<<<>>v^vv>>v^^^v<>v<^v^^v^^<^^<<<>^<<>^^^v^><>^^>^<v^><><v><^<>^^<v>^^>^>^^^v>vv>^><vv^v><><^<vv^^^><v<vv>>v>><<v<v<v<>v>>^>>^v
><<^<^<^>^^<>>^^>>^v^<><>vv^><<v<^>>^^v^<<^>v^v^<><<>^><v<v^^>><>>^>v<<>>>v><v>^^v>^<v>v^^>>>vvv>^v<>v<<>^<<v^>v^<>^v^^>><><>v>>>vv><v>vv^vvv>^^^<>>><^^^v<>v>^<^v>v^^vvvv^v>^^vv^^<<>><v<<v<^>^^<>^<<<v>v>^>^^v^>v^<^<>>v^<^v<vvv<v><>>^^><^vv<<<<>v^v><>^^><^vv><<<<^vv>vvv<>v^<<^>v^^v>v>^<<^>><^v^v<>v>>v>^vv>>v^><^^^^<<<>^^<v^^v<v<v>vvv>>^^<<^>^^<^v<<vv><>^<v<^v<^>v^^<>v^>>^^^v<>><v<v^^v^<v<v^v^>^>>^>^v<><>^vv><<v^^<>vv>vv<<vv^^^v^v^v<v<^><vv^>^>>><<>^><^>^>^^^<<v^>>>><<>>v^v<^<v^^v^^^<v<v^v^^>v>v><v^><>v>><>^^>><<^vv<<>^v<v>^<v^^v>^<^<^>vvvv^^v^>vv<<<<>^>>>><v^^^<<<>^>v^vvv><vv><>>v<^<^v>^<>>>vvvv>^vv^^^v>>^v>>^v<v>^>vv>v>>><vvvv<>>v>v<<>v^<<^<<^>>vv<^^<>v>^^vv^v^^^^vv><>>vv<>v^^>^vvv^^<^<^^v^^<vv<v<v>vv^^^^v^>><>><<v>^v<^^^>>v>v>v^^^^v><^>>v^<<v>>v<^<vv>vv<v^<>>^^^>^<>><vv>^<>>^^^<><^<^v^>>^v>>^v<^v^>><^><vvv^vv><<<vv>^^<>vv>>v<>>^><v^>v<<<<>v<>^>^<>v<v^><^^v<^><v>>^v^^>^<><>^>^><v>>>>>>vv^>^^><^v<^>>^<<>><<<v<v<^<<<^>>vv^>vvv<><>^>>>^v^^v^vv>v>><<^^>vv<<v><><v^><v>>>^^v<<>^<v<<>vvv><><v
^<>>vvv^<<^<v<>^<^<^>v>v>^<<<^^<^vvv^<^>v^^^vv>><>^vv>v^^v^vv><^^^><>>v<v>^><>^v<<v>><v>>^>>^v^>vvv><>v^<>>^<<^<>^>>v^<^<>^^^^<><v^v<v<^^>^>>^v>v>vv^<^<^v^>^v^<>vv<>^^<>^<^<^v^<^vv<^vvv^^^v<>^^vvv<v^^>v>^>v<^<^^^<>^<v>>><v^vvvv<>^>^v>v<><>^v<^^v><^<v<v<<^^^^<v<^>^^<vv><<^<<^>^<^vv>v^>^>><vvv><<^>>>^<>>v<v^<vv<<^<><<^^<^><^<>v^>^>^<^><v^<<^<vv><<<<^<v<<>^^v<>>v^v<<v^<<<><>^v>>>^^<v>>v^<v<v^<^^^v<<<><v<^>><^v^^>>><>>^<v^vv^v<v^<<v^<v><^^>vv<<<vv<<><<v>vv<v<>v^<<<v^v^v^>v<^<>>v^vv>v>v<<><>v<<<^vv^vv^>>>><v<>>^v^<>v>^<<>><<<^^<<>^v>^>>>v><<v>>vvv>>>^>>v><^^>^^^>^>^v^^v^>v^^^^<^v>v>^<v^vv>>><^><^vv^v<>^^><^v<<^<vv><<^^<<^<>>v^><v^><<v^^^^<v<^<>>v^^>^><<vv<<<v<>^>^>^v<<^>^<<^v^vvvv<vvv<<^>>v>v<^v>^>^v^>v^^v<<>><>v^^>^vv>v<>vv^><^>v^vv<><v<^v<>vv^<^>>>v<>v<><v>v><>^^><<>^^<^vvvv^v^v>v>v<<^><<>vv^<v<<v>^<^v^<vvv><^<<>v><<^^vv>^<>^>^^>v^^>v^>>>^v^^<^^>^<<^^<vv^^^v^<^<<^><^>v^>>^>^>v>vvvv^<<<>^<<v^>^v<<<v^vv><>v>>^^<><v<>>^>^>>>>v^<v^^v>v>^^vv^^<^v>v^v>v^^^>>>^^>>^^^v>>vv>^vv^^^^>>>v<^<<><v>^^>^
><v>^^vvv>><<^<>v>v><><<v^^>v><vvv^^>v<<>v<><v>^^<<^>><<>vv<<>vvv<v<<^>>><^<<v>^<vvv<<^^^vvvv><<v>^><vv<v^><^v>^v^>v><v^v^>>^><^>><v>^v^^>><<>v^>>v<v<v<v>v^^^v<>>v^<<vv>>>^<>^^>v>^<v>^v<<vvvv>>^v^<v<v><>^^>^v<v<<^^<>v^>^^>vv<<>^^><^^><<vv>>v>^^^<v>>v<^<^vvvvv><<^^^<^<<^<<<^<>>><^>>>>><v^<>v<<>v>^<<<^<<^vv><v^v<^><>><v<^>^vvv><v>v<><>>>vvv^<^v<v<^<<<v^>>^<v>>>^<><<^>v<>^v^<v<v<><v^><^^<^v><vvv^vvvv>^v<^>^<<^>>^v^<<^>>>><>vv<<^v^v^v<v<^>v>><v^<^<v<>^><^^<<^^^>v^v<^^v>><<>^vv><><>>v^<>>>^>v^^<v^^^>^v>>^v<^>v<>>v>v<v^^><>>><v>^vv<^v><v>vv>vv><v^<<<>>>^^>v^><^vv>v<^v<<v^v<<^<>^><^<>v^>v<v^>>^^v^v<^>^><>><^^v<<<vvv<<v^^>^v>><^vv<^v>>vv<^vv>><^><<<^^^<^>vvvv<^v>>^v>>v^>^vv<v<v>v><v<>^v<>^vvvv^v><>^v^^><^>v>v^><v^^^<^v><v^v<><<v>^<>^><v>>vv^<<v^v>^>>v<<^vvv<>>>v^v><><<<<v><v<>^^><<v^v<>^^v<vv>><>vv^<>v<vv<><^<^<<v^>v<>>>>^<^>>v>vv^<^<>^^<<>>vv<v<^>^<^>^^>>v^^>><<v^^^v>vv^^^v<>^v^>v^>>v>^^<^<<<^vvv<^vv^^^^v>>><v^v<^v>><<vvv><^^^<^v>><vv>v><vvvv^^<>>^^vvv>v^vv<^<>vvv>^^^>><^>v^<v<>^><>>v^>>^>>^>
^v^<^vv<^v^^^><v<^><^<v<><^^<v<>^>v<vv<vv>v^>vv^<^>^>>v^<<>><>^<<^v<v>^>v^vv^v<^v><^<v^^<v<><v>v<>>>^><vv<<^>^>^<^<>^v>v>>v>v>^^v^<<vv<^<v^>^^<^<<>^v^v^^vv<<<<^v>>vvv>^><v<^>>v<^^vv>^^<^<v<<><v^><^>v<<><v^v>^v^>^>^>v<><v>>>^^v<>>v<^<vv<vv>v^<v<>>v<<<^><^>v<vv<>^>><^v>^^v^>v^>v>>>><<><v^><^<><^<^^^<^^>>^^>^<v^><<v^v>v>>^v<>^^^^^v<v^v><>^^v<<v>>^<^v>^^<<^^<^><vv>>^>>>v^>><><v^<vv^^>vv^^>>v<vvv<^<^<><>^>v^v^<vv>^^<v<><vvv<v<^<v^v>^>><><^<^>^^^vv>><<^><><^v>v^v<^^vv>^^<^>>v<^><<^v^<<v^^^^>v<v<>^v^<^<v^>v<v>^>>vv^v^v^^><^<<>v>^^>v^^^<<^^vv^^^><^<v^<vv>v^<><<^^^^>><v<<<vv^<^vv<^^v^^^<>v^<^v>^v<v<^v<^>>^><>>v^<^v^><^v^v>>>v^^>vvv<<><><v><v^>^v>><v>^>>^v><^<^<<vv>^vvv><<>><^v>><vv^<><<v>v^<>v<<<<v^>^>><<<><>^<<^<vvv<>v^<<<<>><><>>^<v<^<>>^v^^v^v<^v>v^v^^<><>^v><<>^<v^<^vvv^v^^^v>v>v<<^^><<v<v<vvv><<^^<^^<v^<v>><^<v>>>v^^<><v>v^v<v^vvvvv>^v^<v^v>^^<v>>^^^><>v^^<^vv>^<^<>^<><>^>v^^><<<^>>v^>^v>v<>v<vv>><vvv<^^><<>v<<^vvv><>v<^v<<^vv^><<<<v><^v>^>v^vv^vvv><>><v>vv<^v^<<<^>><<^><>^><<>^<^>v><>v><^
<v>v<v^^><>^<v><vv^<^vv^^^<<<v><^>>>v^<>><<v<>^><>^>vv^>vvv>v><v^^><v<v><^^<^v<vv^><>^v>>v^>>^^^v^<vvv^>>v^^^><<^>>>^^>v^v^v^<<^^<<><><^^<^^^<<<vv<^^^<v^>vv^^<^^v>^><<<>vvv^^<v<vv<^^^^>v>v<vv>vvv^<>>^><<>^vv>>>^v>>v>^^>^><<vvvv<>^>^<v^v<v><^v^<v^vv^><^v<>v<><<>^<<^vv^vv<>>^^v^vv><>^<^>><><<^v<<^v>><v<v><>^><^vv<<^<vvv>^<v>^v^^vv<v>><><^>v>^><v><^<^<^>^<<>^<vv>v><v<<>>>vv>><^>>vvv<^<vvvv^<^<<>^v<v^<><<<>^<>>>v^v^v^><<v^^v^vvv<v<<^<<vvvv<^^>v>><^<>v>^>v<^^v<><v>^^^vv<^v^>>^^v<^<^v^^v<v>^v^^^<vv>^<<>^^vv>^^>v><^>><vv>>vvv<v<>v<>^>^<<><<^><>vv<>>>^vv>>>>v>^<v^v>>v>^<^<<<v<^^v>vvvvv^<v^v<^><>^>v>v^<^^^^^<vv>>v><>^v^<^v^v>^v^^<^<<^^<v>^v^^>^v<^v>^vvv<<vv^>^^v<v>vvvv^<>><<v>v^vv^<<<>vv^>^<v^^>^>v^<^<v<^^v^^^vv<><<<v>v<^<><>v<<>^<^>^><^v^^v>vvv^>^<vv^>vvv><><v>v>vv>>v><>><<<><^>vv^^^v<<^^<<v^><<v<>^>^<v><^^^v<>v<><<><<<v<<>>v^^<^<><vv<^^v<><><<><>>^^v^vv^v>^><^<<>v^<^^<><vv<^<><v^^<><<vvvvv<<v>^^^<v<<>v<>v<v<><>>^v<^<^v<<<>^v<<v><<<<<vv<^<v^<v><vv^^v<vvv<^v>^^^>^<^><^>^<^>>vv^<>v^>>^<^><>v>>v>
>v<<<^>^<<v>^<^^>>^<>>^>^<^<>^>^^^<><^>v<<vv>v>vvv<^><^v>vv>>^>^v^<^v>>^v^v<^>^<><^>^>><<v<vv>^<<>v>v<>v>v<vv<^<^><>>v^>v<<^<>>v><<<<^<v<^>>vvvvv>vvv>vv<<>>>>vv>vvv^<^v^v>v>v<<<<>^<v^^v>>^<><^^v><<>^^v^^v>v><vvvv^v<^>^v^^v>^<v<vv^<^>v><v<<v^^^v^v<v<>^vv^<^^^><v<^<<>^vv^v<v^^<v^>^>v<vv>>v>>v><<^^<v<v<^>v^^v^v^>>v^>^^^^<v<v<vv>v<v>vvv>>^v^vv<^>>v>><v^>v>vv<^>v^v^^><v<<v^v^v<>>v<<<v<^<<^<<v^>><^<vv<>v<>>><vvvvv^<<vv^<^<^><<v<>^^^>^>^<><<v<>^<<<>>v><>><^vv^><<^<>v>^v<>^^^v^<^<<vv<<<>^^>v><^^^><>>v^v>^>^>>^v^v>>^v<^^>^^>>><<^^>^v><<v><^<v<>>^vv<<<>v>vv^vvvv^^>><<v>>v>v<>>>>v<<vv<^^<^v<^^>v>^<vv><v>vv^^v<v<>v><v^>>^>^<^>>>>^^v<v<^>>>>v>^^>>^^>^>v><^>v^<^v<<v<^v<<vvv^^>^^><v>v^>>^>v><v^v<v>>^^^<^<>^>v^v<^^^^<v<<^<>v>>^<v^<<>v^^<<^<v^<>^>^<v^<v^^<>>v^<<^>v^>vv<^v^vv>^^vv>^v><>><<vv^^<>^v><<><v^v^v>^v<>^<^^^>>^^vv^vv>^v^vvv>v<^<<<>^><>v^v<>v<<><^v<<>>>v><>^>^^v^<^v><<^^^^><^>v<>^<v><>^<^<<^^><v<><><<>^vvv><<^^v>>v^^^v^^>v>^^><>^vv><^^<<<^^><<v>v^>^>^>^<>>><<v^^^><^v<<>^<^<^v><v^>>vv<<>v^>>>v<v>
v^^<>>>v<v^>^v><vv^<^^^<v^>^<vvvv^^^^vvv<v><^vvv<^^v^<<><>>><<^v^<><^^vv<>^<v^v><vv^<>vv<^<^^>v>>>v^v<>^<>^vv^vvv^>^<><v^v<^<<v<<v^^<^<vvv<vvvvv>^v>vv>^<vv>><v>^<<^^^>>><v^v>><<<>^>>v^^^v^^<v^vvv<><vvv>v><^v<vv><<<>><>>^<v><<^>^>>^><>v<v><>v<>>>>>>^<^<^vv<>v>^>^<<^<^^^^^^v><^v^^<v><<>^>v<v<<<^>^v^<<^<^<>^<>><vv<v^^v<<vv^^<v^^>>><<<<v^v>>v^><>^><^v>>><>^>>v^<^^^^>v^<v<><>>^>>v>^v>>^<v>>v>^^^<<<^^<>>>>^>vv>^v^^<<^<^<<><^>v>v^v<><>>^v^>^^^^^v^<vv><v^v^v<^<<>^^v^<v<vv>^>>v><>^><<>><><<vv^^<^<v<^^>>^^v<vvvvv^v>v^v>^v^v>><v>^>><^^><>>v<<<>><^vv^<<<^^^><>^><^>v>v>v^vv^>^^^vv^^><^^><><<^<<vv^^v>v>v>^><<<<^^v^^^v^>>vv<<<>vv>>>^v>v>><>v<v^<>^^>><<><v<<^^<^>vv<<<<>>^><<<>>^>>>>v<^v^>v><><>v^^^<<^^vv<>^vvvv><>v^v><<><v>^vv<vv<<>>^^>>v>><^<<vv^<>v^<^^>>v>>^^>v^^vv^<v>^<^^<><^><v<v>v<>^>>v<<<vvvv<^>v^vv>^v<vv>>v<vv^v><<v<^<><v><v^v><<^>^<v^>^v>vv><>><<>v>>v>>>><vv<v<>^^<v<^<<>^>^^<vv>>^vvv^vvv>^^<<>>^v^^<>>v>v^>^^^v>>v>^>^v<^>^<><<v>^<v<vv^<vv^v^<v>>^v>^><^v>v>>>v<><vv>v^<^>vv^><v^vv<v><v^v><<<vv^<v
<^>^<<v^<vv^^^^>v<>v<^>^^^v^><^><<v<v^v<vv><^v<>^<v^>v><>v><^<<><<v<^v^<v<><v^v>^<<>^>^<v<^^<^<>^^<v><>^^v^<v>><>^v><v^^vv<><v>^<v^^<><vv^>><>><<>>>vv<<^^^>^>^<><<^><>^<<>><^<^>vv><<<<^>^<<^<<v><^^v<^<<v>^v^<^<v<>v^v<vvvv^v^^v>v>><v<v>>v^>vvv>>>vvv^v^^<>><vv>>^<><>>v<^v^^v^<>^^v>>^^>><^>><v<><<<^v^>v><v>^v><vv<<<<v^v<<>v<<<><>>^>>^^<v<>v>>v>^>^^<<vv<<<^v>><^><^v><^>v^>^<>^^^vv<>vv>^vvvv<<><<v>>^v<vv^^<>v^>^<v><>v<v<^vv>vv^vv<^^<>v<><v<vvvv>><^>>^v>^<<>^>v>vv^>>^<^^v<^>v<<^^><<^^>>>>>^^^v<v^^<><^<>^v><<>^<<vv<<^^vvv<^<^<<vv^v<v<>^<v^v<<<<^^^vv<<><^<^^v<^vv>^<<v^<><>^vv^>^<<<>>vv^<<<v>^>>>^<<v<<<^v^><>^>^<v<>^^v<><v>>^^<<>v<v^v^v<>^>^><v>v>>><^^^<^v<>>^^^<><^vv^<^v><<<vvv<v><<v^>vvv<v>>^^^>><^^<><<^v^<^^<v<^<<^<>>>>^>>v^<<><<^v^v^v<vv<v<<<<v>^^>><^v>><^>>vv>^<v^<^v^^<><vv>v^v^^<<>>^>>^<^^^<^<^v>^<<^<vv<>v<><^v>v^>>vv^^><<<<vv<<v>v^><^<>vv<v><^<><v<><v>^^v<<^<>^><><>^vv^vv^^vv<^vv<>><^<v<^>>>v>>v<>^^>v^^>v^>^<>><v^^>v^^>vv<^<<^v<vv>>^vvv>><v^<^<<><v>>^v<<^v><<^v<>>>>^<<<<<^<<><<v>>v<^>><<
>^<<>vv<^<<>^v^^v<^^^<^>>^><vvv^^^v^<v><^><>>>><v<<v^vv^^^^^<^^vvv>v^^<^^><^^^vv>v^v<v<^v^v>^^^<><<^<<^v>>^v^^>v^v<v><<v^>>^^<^vv><v^v^<^<v>v><>^>^>vvv<>>^v>^v>><>^^v>^>^^vvv><<><v^<>vv><>^>><<<^<vv<v^v>>v>v<<>vv>><><v>v<>^<v>v^<><>v>vv>^v>v<vv<^>v<<>>^<^^>v^v><vv<<>>v><>>>>^><<<<v>>^^<<<^>v<v<<<><<<vv>^>^vv^<<^v>>v<v^vvv><vvv<^>^vv>>v^v^^v^^<<v>>^^^^^^>v<>^v<v^v>v<^^^>^<<>>vv<>v>v<<v^<>^<>^vvv>v^vv<>>^^>>>>^vv>^^>^v<^^>^>><^^>>^v><<^vv<v^v<v^vv^v<<><<^vv^^vv>^v>^^>>^v<><><<v^v><<>^<^>>vv<^<v<vv<>>^>>^>^v<v<<>^<v><>^<>^^^<>vv^<<>vv><<v^>^^vv^vv<<<^v^>>>v^v>^v^^v^>v<vv^^<v^^^<<<v^>>><^<v<v<^><^v^<>v><^^><^<>v>>vv<<>^>>^vvv^^>^<^v^<v>v<<>v^>>^<>>v>vv>>v>>>^<vv<vv>v^v>v<v>^v^>v^^^vvv<^<>v^<^>vv<>>vv<^^v>v^>^<^^^<<<v<<<<^^^^v^v^vvv>v^^vv<^>v<v^<^>>>>>v^^v><>v^<><>v^v^<^<>>^^<<<v<^v^>>>^^^<<^>><<<<vv>v^^^^>^>v^>^v<^<^<v<<v<vvv^><v>>>vv>^v<>v>><<v>>^^v>^v^<>v<v^v<<^v><vvv<v^v>>^^v^><^<v^^^^<>^v<v>v^v^^v<^^>v^^^v>v<<vv<^><v>vv<><>>^v^>v^vvv>>v^v^v>^<>^v>v><>^v^^<v<^>>><<>^>v>>^v>>^v<vvvv><<>v
><v<>^^>^vv>vv>>>><<^v^<v>^<^<v<^>>^>v^v<<>^^^<v>vv>>^><>>v<>^><<><<>v>^><^^<<^^><>v<vvv^>>^^>><^<^<>v^v^>><vv<<>><^<><<^v^>vv<v<<>vvv<^v><v<<<<>>v<<>v>v^<vv<vvv>v>><^vv>v<<><^vv><>><v>>vv^<vv^<<v>vvv<^^>^><<vv<^>>><^v<v<<^>^v<<><<v^>vvv<v>vvv<v<^^>>^v^><^^>v<>><<^><>v>><>^vv<>><<<v<^<vv>^<^<^<>><v^^v<^^^>>v<v><<v^v<v^vv^^v><v<v><><<>^v><vv^v>^^v<vvv<<<<^>><^vv<^v>><<v<<>v><>^<<>>>><<^<vv^v<v>><<>>>v^<vv<v<<<>v^v>^v^vv<v^v^^^<>>>v<^v^<<<<^v^<vv>>^<<<^^>>>^<v>^>>>>^^v<<><>>^<<<<<<><v<v^<^^vv>^^^v^>>v<v^^><<v<>^>^><v>>>^vv^^<>^^v><<v>^>^>^v<vv<<<>>>^^v<^^<<^<><<^>>^>vv>^>>^>v>>^^>>>>^^<>^<><<<<><>>v>v^<v^^^vv>>>>>v^^^<^^vv^v^>><>^^^^v><^<v<v^v<<v<^v<vv<>v^v<>>v<^v^v<v^<vvv><v>v^>v<<^^<<<v^<>^>>^^<<^>vvv<>vvvvv>v^><<<>>^>>^^>v^>^<^><><v<<^^<<v^<v>^<vv>><><<><>^<><^v>^><^><<v<<<<^^<<>>v^<<>v>^vv<v<^^^vvv<v<v<<<vvv><^>v>vv<<>>v>^<<<>v>v<<vv>v>^>vvvv>^><^^>>v^v<v>^<v>>^^v>^><v^^^v^>vv>^vv<<<v><v^<v^^>^v<<v<v^>^vv><^v^><^<>v^v<<<vv<<^v>>^^^<><<<v^<>>^^><>>vvvv^^<><v<<<>v^>^v<<>vvv^v>^<<^<v<>>`.replaceAll('\n', '').split('')
moves.map((move) => {
    if (move == '<') {
        let temp = [];
        let foundDot = false;
        for (let i = pos[1] - 1; i >= 0; i--) {
            const element = map[pos[0]][i];
            if (element == '#') {
                break;
            }
            if (element == '.') {
                foundDot = true;
                map[pos[0]][i] = '@';
                temp.push(i)
                break;
            }
            temp.push(i)
        }
        if (foundDot) {
            temp.map((i, index) => {
                if (index == 0) {
                    map[pos[0]][i + 1] = '.';
                    map[pos[0]][i] = '@';
                    pos = [pos[0], i];
                } else {
                    map[pos[0]][i] = 'O'
                }
            })
        }
    }
    if (move == '>') {
        let temp = [];
        let foundDot = false;
        for (let i = pos[1] + 1; i < map[0].length; i++) {
            const element = map[pos[0]][i];
            if (element == '#') {
                break;
            }
            if (element == '.') {
                foundDot = true;
                map[pos[0]][i] = '@';
                temp.push(i)
                break;
            }
            temp.push(i)
        }
        if (foundDot) {
            temp.map((i, index) => {
                if (index == 0) {
                    map[pos[0]][i - 1] = '.';
                    map[pos[0]][i] = '@';
                    pos = [pos[0], i];
                } else {
                    map[pos[0]][i] = 'O'
                }
            })
        }
    }
    if (move == '^') {
        let temp = [];
        let foundDot = false;
        for (let i = pos[0] - 1; i >= 0; i--) {
            const element = map[i][pos[1]];
            if (element == '#') {
                break;
            }
            if (element == '.') {
                foundDot = true;
                map[i][pos[1]] = '@';
                temp.push(i)
                break;
            }
            temp.push(i)
        }
        if (foundDot) {
            temp.map((i, index) => {
                if (index == 0) {
                    map[i + 1][pos[1]] = '.';
                    map[i][pos[1]] = '@';
                    pos = [i, pos[1]];
                } else {
                    map[i][pos[1]] = 'O'
                }
            })
        }
    }
    if (move == 'v') {
        let temp = [];
        let foundDot = false;
        for (let i = pos[0] + 1; i < map.length; i++) {
            const element = map[i][pos[1]];
            if (element == '#') {
                break;
            }
            if (element == '.') {
                foundDot = true;
                map[i][pos[1]] = '@';
                temp.push(i)
                break;
            }
            temp.push(i)
        }
        if (foundDot) {
            temp.map((i, index) => {
                if (index == 0) {
                    map[i - 1][pos[1]] = '.';
                    map[i][pos[1]] = '@';
                    pos = [i, pos[1]];
                } else {
                    map[i][pos[1]] = 'O'
                }
            })
        }
    }
    // map.map(row => {
    //     console.log(row.join(" "))
    // })
    // console.log('\n')
})
map.map(row => {
    console.log(row.join(" "))
})
console.log('\n')
let result = 0;
map.map((row, i) => {
    row.map((item, j) => {
        if (item == 'O') {
            result += ((i * 100) + j)
        }
    })
})
console.log(result)