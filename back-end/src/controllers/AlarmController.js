const Alarm = require("../models/Alarm");

module.exports = class AlarmController {
  async show(req, res) {
    try {
      const deviceNames = {
        1: "Bionic",
        2: "Code",
        3: "Challenge",
        4: "Junior",
        5: "Test",
      };
      const alarmNames = {
        1: "NodeJS",
        2: "VueJS",
        3: "MongoDB",
        4: "Express",
        5: "Bootstrap",
      };

      const alarms = await Alarm.find();
      const result = alarms.map((alarm) => {
        return {
          ...alarm.toJSON(),
          deviceName: deviceNames[alarm.deviceType],
          alarmName: alarmNames[alarm.type],
        };
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ erro: error.message });
    }
  }

  async create(req, res) {
    const { type, deviceType, serial, checked } = req.body;

    if (
      type !== undefined &&
      type !== null &&
      deviceType !== undefined &&
      deviceType !== null &&
      serial !== undefined &&
      serial !== null &&
      checked !== undefined &&
      checked !== null
    ) {
      const alarm = {
        type,
        deviceType,
        serial,
        checked,
      };

      try {
        await Alarm.create(alarm);

        return res.status(201).json({ message: "Alarm successfully created." });
      } catch (error) {
        return res.status(500).json({ erro: error });
      }
    } else {
      return res.status(400).json({ message: "Bad Request." });
    }
  }

  async removeAll(req, res) {
    try {
      await Alarm.deleteMany({});

      return res.status(200).json({ message: "All data removed." });
    } catch (error) {
      return res.status(500).json({ erro: error });
    }
  }
};
