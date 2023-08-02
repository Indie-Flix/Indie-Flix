const request = require('supertest');

const server = 'http://localhost:3000'

// multiple tests for same route
// make sure we recieve 200 and the correct content type

describe('Route integration', () => {

    describe('/api/allVideos', () => {
        it('responds with 200 status and videos from DB are in body of response', () => {
            return request(server)
            .get('/api/allVideos')
            .expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toEqual(true);
            })
        })
    })

    describe('/api/videos/:id', () => {
        it('responds with an error when sending a faulty video id', () => {
            return request(server)
            .get('/api/videos/:randomthingthatdoestexit')
            .expect(500)
            .then(response => {
                expect(response).toEqual({ err: 'Failed to get logged in creator.' })
            })
        })
    })
})