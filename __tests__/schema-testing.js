const Video = require('../server/models/videoModel');
const Creator = require('../server/models/creatorModel'); //includes for the "createdBy" field of the Video Schema

//The following tests are for the Video schema specifically. More tests can be added later


//Things to test
//We can create an entry in the database with the model
//If the wrong info is entered, the model is not created
//If a field is empty, the model errors/is not created
//The created by field should match a user from the creatorModel
//If something is entered for the created By field, the model should error/not be created

describe('Schema Testing', () => {
  
  
  /*
  
  The bellow describe block is commented out because it isn't working yet.
  It can be fixed later by getting rid of of the beforeALl and afterAll
  The video should be created in it block
  
  */
 
//  let creator;
//  let newCreator;
//  let newVideo = 'test';
//  let expectVid;
  // describe('Video Model', () => {
    
  //   beforeAll((done) => {
  //     //create the creator
  //     Creator.create({
  //       username: 'TEST USER-WILLDELETE',
  //       email: 'test@test.com',
  //       password: '324p0Mnf!DsfFj',
  //       studio: 'test',
  //       confirmPassword: '324p0Mnf!DsfFj'
  //     }).then((data) => creator = data)
  //       .catch((err) => creator = err)
        
  //     //create the video
  //     Video.create({
  //       title: 'a123willdelete',
  //       description: 'b',
  //       image: 'c',
  //       credits: 'd',
  //       videoLink: 'e',
  //       createdBy: Creator.findOne({ username: 'TEST USER-WILLDELETE' })._id
  //     }).then(data => newVideo= data)
  //       .catch(err => newVideo = err);
  //     done();
  //   });
  
  //   afterAll((done) => {
  //     Video.deleteOne({ title: 'a123willdelete' })
  //     Creator.deleteOne({ username: 'TEST USER-WILLDELETE' })
  //     done();
  //   })
  

  //     it('can be used to successfully create a model in the database', () => {
  //       //test to see if the video is in the database
  //       expect(newVideo).toEqual({
  //         title: 'a123willdelete',
  //         description: 'b',
  //         image: 'c',
  //         credits: 'd',
  //         videoLink: 'e',
  //         createdBy: Creator.findOne({ username: 'TEST USER-WILLDELETE' })._id
  //       })
  //     })
  // })

  describe('Creator Model', () => {

    it('should include the correct fields', () => {
      let result = 'test';

      Creator.create({
        username: 'TEST USER-WILLDELETE',
        email: 'test@test.com',
        password: '324p0Mnf!DsfFj',
        studio: 'test',
        confirmPassword: '324p0Mnf!DsfFj'
      }).then((data) => {
          expect(data).toEqual({
            username: 'TEST USER-WILLDELETE',
            email: 'test@test.com',
            password: '324p0Mnf!DsfFj',
            studio: 'test',
            confirmPassword: '324p0Mnf!DsfFj'
          })
        })
        .catch(err => {
          result = err;
        })
      
    })
  })

})