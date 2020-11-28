const Sequelize = require('sequelize');
const modelCinema = require('./models/Cinema');
const modelCinemaSystem = require('./models/CinemaSystem');
const modelCinemaType = require('./models/CinemaType');
const models = require('../../services/db.service');
// const sequelize = db().generateModel(false);

const Cinema = modelCinema();
const CinemaSystem = modelCinemaSystem();
const CinemaType = modelCinemaType();
const CinemaController = () => {
  const layThongTinHeThongRap = async (req, res) => {
    const { maHeThongRap } = req.body;
    try {
      const cinemaSystemData = await CinemaSystem.findAll({
        [Sequelize.Op.or]: {
          maHeThongRap: {
            [Sequelize.Op.contains]: maHeThongRap,
          },
        },
      });
      return res.status(200).json({ cinemaSystemData });
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  };
  const layThongTinCumRapTheoHeThong = async (req, res) => {
    try {} catch (e) {}
  };
  const layThongTinLichChieuHeThongRap = async (req, res) => {
    // Scope heThong -> cumRap -> rap -> lichChieu
    const { maHeThongRap } = req.body;
    const db = models().generateModel(false);
    const result = await db.sequelize.transaction(async (t) => {
      const lichChieuTheoHeThongRapData = await CinemaSystem.findAll({

      });
    });
  };
  return {
    layThongTinHeThongRap,
  };
};
module.exports = CinemaController;

