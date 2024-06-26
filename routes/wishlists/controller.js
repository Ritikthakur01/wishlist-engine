// controllers/movieController.js
import Movie from './model'

export const addMovie = async (req, res) => {
  try {
    const movie = new Movie({
        userId : req.user._id,
        ...req.body});
    await movie.save();
    return res.status(201).json({ flag:1,message: 'Movie Wishlist added successfully',
        data:movie
     });
  } catch (error) {
    return res.status(500).json({flag:0, error:error.message});
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({user:req.user._id});
    return res.status(201).json({ flag:1,message:"All movies fetched successfully.",data : movies });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.find({_id:req.params.id, user: req.user._id});
    if (!movie) {
        return res.status(404).json({ flag:0,message: "Movie doesn't exist." });
    }
    return res.status(200).json({ flag:1,message: 'Moive fetched successfully' });
  } catch (error) {
     return res.status(500).json({flag:0, error:error.message});
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) {
      return res.status(404).json({
        flag: 0,
        message : "movie wishlist doesn't exist.",
      })
    }
    return res.status(200).json({ flag:1,message: 'Moive updated successfully',data : movie });
  } catch (error) {
     return res.status(500).json({flag:0, error:error.message});
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({
        flag: 0, message: "movies doesn't exists."
      });
    }
    return res.status(201).json({ flag:1,message: 'Movie wishist deleted successfully' });
  } catch (error) {
    return res.status(500).json({flag:0, error:error.message});
  }
};

export const toggleWatch = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user;

      const movie = await Movie.findOne({ _id: id, user: userId });
      if (!movie) {
        return res.status(404).json({ flag: 0, message: 'Movie not found' });
      }

      movie.watched = !movie.watched;
      await movie.save();
  
      return res.status(200).json({ flag: 1, message: 'Movie watch status toggled successfully', movie });
    } catch (error) {
      return res.status(500).json({ flag: 0, error: error.message });
    }
  };