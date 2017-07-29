return {
  version = "1.1",
  luaversion = "5.1",
  tiledversion = "1.0.2",
  orientation = "orthogonal",
  renderorder = "right-down",
  width = 50,
  height = 50,
  tilewidth = 32,
  tileheight = 32,
  nextobjectid = 1,
  properties = {},
  tilesets = {
    {
      name = "tiles_2",
      firstgid = 1,
      filename = "tileset.tsx",
      tilewidth = 32,
      tileheight = 32,
      spacing = 0,
      margin = 0,
      image = "../../../../Desktop/tiles_2.png",
      imagewidth = 256,
      imageheight = 32,
      tileoffset = {
        x = 0,
        y = 0
      },
      grid = {
        orientation = "orthogonal",
        width = 32,
        height = 32
      },
      properties = {},
      terrains = {},
      tilecount = 8,
      tiles = {}
    }
  },
  layers = {
    {
      type = "tilelayer",
      name = "Calque de Tile 1",
      x = 0,
      y = 0,
      width = 50,
      height = 50,
      visible = true,
      opacity = 1,
      offsetx = 0,
      offsety = 0,
      properties = {},
      encoding = "lua",
      data = {
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 3, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 8, 8, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 8, 8, 2, 7, 2, 2, 8, 8, 2, 2, 2, 8, 8, 2, 8, 2, 2, 8, 8, 2, 2, 2, 2, 8,
        8, 2, 2, 8, 2, 7, 7, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 2, 2, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 8, 7, 2, 2, 2, 2, 8, 2, 2, 2, 8, 2, 8,
        8, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 8, 8, 2, 2, 2, 2, 8, 3, 2, 2, 8, 2, 8,
        8, 2, 2, 8, 2, 2, 2, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 8, 2, 2, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 8,
        8, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 8, 8, 8, 2, 2, 8, 7, 2, 2, 2, 2, 8, 8, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 7, 8, 2, 2, 8, 8, 7, 2, 2, 8, 8, 2, 2, 2, 2, 2, 8, 8, 8, 8, 2, 2, 8, 2, 8, 2, 2, 2, 8, 8, 8, 8, 8, 8, 2, 2, 8,
        8, 2, 2, 8, 8, 8, 2, 2, 2, 2, 2, 8, 8, 2, 8, 2, 2, 2, 8, 8, 2, 2, 2, 2, 2, 8, 8, 8, 8, 8, 2, 7, 8, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 8,
        8, 2, 2, 2, 2, 8, 8, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 8, 2, 8, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 7, 2, 8, 2, 2, 8,
        8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 8,
        8, 8, 8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 8, 8, 8, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 8, 2, 2, 2, 8, 8, 8, 8, 2, 8, 2, 2, 8,
        8, 2, 2, 2, 2, 2, 2, 2, 8, 8, 2, 8, 8, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 8,
        8, 2, 2, 7, 8, 2, 2, 2, 2, 8, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 7, 2, 8, 2, 2, 2, 2, 8, 2, 2, 8, 8, 8, 2, 2, 8, 8, 8, 8, 8, 8, 2, 2, 8,
        8, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 8, 8, 8, 2, 2, 2, 8, 2, 2, 2, 8, 2, 8, 2, 8, 8, 8, 2, 2, 8, 8, 8, 2, 8, 2, 8, 2, 2, 8, 8, 8, 2, 8, 8, 8, 8, 2, 8, 8, 2, 2, 2, 8, 8, 2, 2, 8,
        8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 8, 8, 8, 2, 2, 3, 8, 2, 2, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 8,
        8, 2, 2, 8, 2, 2, 2, 2, 2, 8, 8, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 8, 8, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 8, 2, 7, 7, 2, 2, 8, 8, 8, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 8, 8, 8, 2, 2, 2, 8, 2, 2, 2, 2, 7, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 8,
        8, 2, 2, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 2, 8, 8, 8, 2, 2, 8, 2, 8, 2, 8, 8, 8, 8, 8, 8, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 7, 2, 8, 8, 8,
        8, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 8, 8, 8, 8, 2, 8, 2, 8, 2, 8, 8, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 2, 2, 2, 8, 2, 2, 8, 2, 8, 8, 2, 2, 2, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 8, 2, 2, 2, 2, 8, 8, 2, 8, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 7, 7, 7, 7, 7, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 8,
        8, 2, 8, 2, 2, 8, 8, 8, 2, 2, 8, 2, 8, 8, 8, 2, 8, 2, 8, 8, 2, 8, 2, 7, 2, 2, 2, 7, 2, 8, 8, 2, 2, 8, 8, 2, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 2, 2, 8,
        8, 8, 8, 2, 2, 8, 7, 2, 2, 8, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 4, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 8, 8, 8,
        8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 8, 2, 2, 8, 8, 2, 7, 2, 2, 2, 7, 2, 8, 2, 8, 8, 2, 8, 8, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 7, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 8, 2, 2, 2, 8, 2, 2, 8, 2, 2, 7, 7, 7, 7, 7, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 7, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 7, 2, 2, 8, 2, 2, 8, 2, 8, 2, 2, 8, 8, 8, 2, 2, 2, 8,
        8, 2, 2, 2, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 8, 8, 8, 2, 8, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 8, 2, 2, 2, 8,
        8, 8, 2, 2, 8, 2, 2, 2, 2, 2, 2, 8, 8, 8, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 8, 2, 8, 2, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 3, 2, 2, 8, 2, 2, 8, 8, 8, 8, 8, 2, 2, 2, 2, 2, 8, 2, 8, 8, 8, 8, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 8,
        8, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 7, 2, 2, 8, 8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 8, 8, 8, 8, 8, 8, 8, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 2, 8, 8, 2, 2, 8,
        8, 2, 2, 2, 8, 2, 2, 2, 8, 8, 2, 2, 2, 2, 2, 8, 2, 8, 8, 8, 8, 2, 8, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 8, 8, 8, 2, 8, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 7, 8, 2, 8, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 8, 2, 2, 2, 8, 8, 2, 8, 8, 8, 2, 8,
        8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 8, 8, 8, 8, 2, 2, 2, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 8, 8, 8, 8, 8, 2, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 8, 2, 7, 2, 8, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 8, 2, 8, 2, 2, 2, 2, 2, 2, 8, 1, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 8, 8, 8,
        8, 2, 2, 8, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 2, 2, 8, 2, 2, 8, 8, 2, 2, 8, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 8, 8, 2, 2, 2, 2, 8, 8, 8, 2, 2, 2, 8, 8, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 8,
        8, 2, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 2, 2, 3, 2, 2, 2, 8, 8, 8, 8, 8, 8, 8, 8, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 2, 2, 2, 8, 2, 2, 8, 8, 2, 8, 8, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 8, 8, 8, 2, 2, 2, 8,
        8, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 8, 2, 7, 2, 2, 2, 2, 2, 2, 8, 8, 2, 8, 2, 2, 2, 2, 2, 8, 2, 2, 8, 2, 2, 8, 8, 2, 8, 2, 8, 2, 2, 2, 8,
        8, 2, 8, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 8, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 8,
        8, 2, 8, 2, 2, 2, 2, 8, 8, 2, 2, 8, 8, 2, 2, 2, 2, 2, 8, 2, 2, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 8, 8, 8, 8, 2, 8, 2, 2, 2, 8, 2, 2, 8, 2, 8, 2, 2, 2, 8,
        8, 2, 8, 8, 2, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 7, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 2, 2, 2, 8, 8, 2, 8,
        8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 8, 8, 8, 2, 8, 2, 2, 2, 8, 8, 8, 2, 2, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8,
        8, 7, 2, 2, 8, 8, 8, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 2, 2, 8, 8, 2, 2, 8,
        8, 7, 7, 2, 8, 3, 2, 2, 2, 2, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 8, 7, 2, 7, 8, 2, 2, 2, 2, 3, 8, 2, 2, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
      }
    }
  }
}
