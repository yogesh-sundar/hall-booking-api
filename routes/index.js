var express = require("express");
var router = express.Router();

let roomDetails = [];

router.get("/room", (req, res) => {
  res.send(roomDetails);
});

router.post("/room-creation", (req, res) => {
  let data = {
    roomId: req.body.roomId,
    roomName: req.body.roomName,
    seats: req.body.seats,
    amenities: req.body.amenities,
    price: req.body.price,
    bookedStatus: "Available",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
  };
  roomDetails.push(data);
  res.send({
    message: "Room created successfully",
  });
});

router.post("/booking-room", (req, res) => {
  let booked = false;
  roomDetails.map((e) => {
    if (e.roomId === req.body.roomId) {
      e.bookedStatus = "Occupied";
      e.customerName = req.body.customerName;
      e.date = req.body.date;
      e.startTime = req.body.startTime;
      e.endTime = req.body.endTime;
      booked = true;
    }
  });
  if (booked) {
    res.send({
      message: "Room booked successfully",
    });
  } else {
    res.send({
      message: "Failed to book",
    });
  }
});

router.get("/booked-room-details", (req, res)=>{
  let data = [];
  roomDetails.map((e)=>{
    if(e.bookedStatus == "Occupied"){
      data.push({
        roomName:e.roomName,
        bookedStatus:e.bookedStatus,
        customerName:e.customerName,
        data:e.date,
        startTime:e.startTime,
        endTime:e.endTime
      })
    }
  })
  res.send(data);
})

router.get("/customer-details", (req, res)=>{
  let data = [];
  roomDetails.map((e)=>{
    if(e.bookedStatus == "Occupied"){
      data.push({
        customerName:e.customerName,
        roomName:e.roomName,
        date:e.date,
        startTime:e.startTime,
        endTime:e.endTime
      })
    }
  })
  res.send(data);
})


module.exports = router;